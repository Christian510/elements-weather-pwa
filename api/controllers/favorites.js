
// const db = require('../db/database').pool;
const findAllById = require('../db/database').findAllById;
// const findOneById = require('../db/database').findOneById;
const insertOne = require('../db/database').insertOne;
const deleteOne = require('../db/database').deleteOne;

exports.fetchFavorites = (req, res, next) => { // get all favorites for one session id from db
  console.log('req.seesionID: ', req.sessionID)
  // console.log('req at fetchFavorites: ', req)

  return findAllById('session_favorites', 's_id', req.sessionID)
    .then(data => {
      // console.log('result b: ', data);
      if (res.statusCode === 200) {
        res.send({
          message: 'GET FAVORITES FROM DB',
          locations: data,
          session: req.sessionID,
        })
      } else {
        console.log('error msg: ', res.error)
        throw new Error('Unable to get locations');
      }
    }
    )
    .catch(err => {
      console.log('error msg: ', err)
    });
}

exports.addOneFavorite = async (req, res, next) => { // add one favorte to db
  console.log('sessionID: ', req.sessionID)
  console.log('req.body: ', req.body);
  try {
    const result = await insertOne(req.body, req.sessionID)
    // console.log('result: ', result);
    res.send({
      message: 'SUCCESS',
      result: result, // return 1 if successful or 0 if not
      session: req.sessionID,
    })
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to add location: ', err);
  }
}

exports.deleteOneFavorite = async (req, res, next) => { // delete one favorte from db
  
  console.log('req.query: ', req);

  try {
    const result = await deleteOne(req.query.session_id, req.query.location_id)
    if (result) {
      console.log('favorites.js result: ', result);
      // console.log('result: ', result);
      res.send({
        message: 'FAVORITE DELETED FROM DB',
        result: result.affectedRows, // return 1 if successful or 0 if not
      })
    }
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to delete location: ', err);
  }
}
