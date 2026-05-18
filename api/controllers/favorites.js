const Database = require('../db/database.js');
const db = new Database();

function userId(req) {
  return req.session.uid || req.sessionID;
}

exports.fetchFavorites = (req, res, next) => {
  if (!req.session.sess) {
    req.session.sess = req.sessionID;
  }
  const id = userId(req);
  return db.findAllById('session_favorites', 's_id', id)
    .then(data => {
      res.status(200).json({
        message: 'GET FAVORITES FROM DB',
        locations: data,
        session: id,
      });
    })
    .catch(err => {
      console.error('error msg: ', err);
      res.status(500).json({ message: 'Unable to get locations', err });
    });
};

exports.addOneFavorite = async (req, res, next) => {
  try {
    const result = await db.insertOne(req.body, userId(req));
    res.status(200).json({
      message: 'ONE FAVORITE ADDED',
      result,
      session: userId(req),
    });
  } catch (err) {
    console.error('error msg: ', err);
    res.status(500).json({ message: 'Unable to add location', err });
  }
};

exports.deleteOneFavorite = async (req, res, next) => {
  try {
    const result = await db.deleteOne(req.query.session_id, req.query.location_id);
    if (result) {
      res.status(200).json({
        message: 'ONE FAVORITE DELETED',
        result: result.affectedRows,
      });
    }
  } catch (err) {
    console.error('error msg: ', err);
    res.status(500).json({ message: 'Unable to delete location', err });
  }
};
