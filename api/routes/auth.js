const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');
const Database = require('../db/database');
const db = new Database();

const TEN_YEARS_MS = 1000 * 60 * 60 * 24 * 365 * 10;

// Verifies the Firebase ID token, stores the UID in the session, and migrates
// any anonymous favorites saved under the old session ID to the Firebase UID.
// Does NOT migrate when a previous user's UID is still in the session — that
// would pollute the new user's favorites with another account's data.
router.post('/link-session', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'idToken required' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    // Only migrate anonymous session favorites (no prior uid means anonymous)
    const anonymousSessionId = req.session.uid ? null : req.sessionID;

    req.session.uid = uid;
    req.session.cookie.maxAge = TEN_YEARS_MS;
    req.session.isRegistered = true;

    if (anonymousSessionId) {
      await db.migrateFavorites(anonymousSessionId, uid);
    }

    req.session.save((err) => {
      if (err) {
        console.error('Failed to save session:', err);
        return res.status(500).json({ error: 'Failed to save session' });
      }
      res.json({ result: 1, uid });
    });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Destroys the Express session on logout so the next user starts clean.
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ result: 1 });
  });
});

// Called after a user successfully creates a Firebase account.
// Upgrades the anonymous session cookie to a persistent one with no expiry.
router.post('/upgrade-session', (req, res) => {
  if (!req.session) {
    return res.status(400).json({ error: 'No session found' });
  }
  req.session.cookie.maxAge = TEN_YEARS_MS;
  req.session.isRegistered = true;
  req.session.save((err) => {
    if (err) {
      console.error('Failed to upgrade session:', err);
      return res.status(500).json({ error: 'Failed to upgrade session' });
    }
    res.json({ result: 1 });
  });
});

module.exports = router;
