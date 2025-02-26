import { findAllById } from '../db/database.js';
import { insertOne } from '../db/database.js';
import { deleteOne } from '../db/database.js';

export const fetchFavorites = (req, res, next) => {
  return findAllById('session_favorites', 's_id', req.sessionID)
    .then(data => {
      if (res.statusCode === 200) {
        res.status(200).json({
          message: 'GET FAVORITES FROM DB',
          locations: data,
          session: req.sessionID,
        })
      } 
    })
    .catch(err => {
      console.error('error msg: ', err)
      res.status(500).message({
        message: 'Unable to get locations', 
        err: err
      });
    });
}

export const addOneFavorite = async (req, res, next) => {
  try {
    const result = await insertOne(req.body, req.sessionID)
    res.status(200).json({
      message: 'ONE FAVORITE ADDED',
      result: result,
      session: req.sessionID,
    });
  }
  catch (err) {
    console.error('error msg: ', err)
    res.status(500).message({
      message: 'Unable to add location',
      err: err
    });
  }
}

export const deleteOneFavorite = async (req, res, next) => {
  try {
    const result = await deleteOne(req.query.session_id, req.query.location_id)
    if (result) {
      res.status(200).json({
        message: 'ONE FAVORITE DELETED',
        result: result.affectedRows,
      });
    }
  }
  catch (err) {
    console.error('error msg: ', err)
    res.status(500).message({
      message: 'Unable to delete location',
      err: err
    });
  }
}
