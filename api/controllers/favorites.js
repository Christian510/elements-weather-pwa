import { findAllById } from '../db/database.js';
import { insertOne } from '../db/database.js';
import { deleteOne } from '../db/database.js';

export const fetchFavorites = (req, res, next) => {

  return findAllById('session_favorites', 's_id', req.sessionID)
    .then(data => {
      if (res.statusCode === 200) {
        res.send({
          message: 'GET FAVORITES FROM DB',
          locations: data,
          session: req.sessionID,
        })
      } else {
        throw new Error('Unable to get locations');
      }
    })
    .catch(err => {
      console.log('error msg: ', err)
    });
}

export const addOneFavorite = async (req, res, next) => {
  try {
    const result = await insertOne(req.body, req.sessionID)
    res.send({
      message: 'SUCCESS',
      result: result,
      session: req.sessionID,
    })
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to add location: ', err);
  }
}

export const deleteOneFavorite = async (req, res, next) => {
  try {
    const result = await deleteOne(req.query.session_id, req.query.location_id)
    if (result) {
      res.send({
        message: 'FAVORITE DELETED FROM DB',
        result: result.affectedRows,
      })
    }
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to delete location: ', err);
  }
}
