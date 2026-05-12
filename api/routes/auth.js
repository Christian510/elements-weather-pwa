const express = require('express');
const router = express.Router();

const TEN_YEARS_MS = 1000 * 60 * 60 * 24 * 365 * 10;

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
