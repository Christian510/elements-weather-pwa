
const db = require('../db/database').pool;
const findAllById = require('../db/database').findAllById;
const findOneById = require('../db/database').findOneById;
const insertOne = require('../db/database').insertOne;
const deleteOne = require('../db/database').deleteOne;

exports.fetchFavorites = (req, res, next) => { // get all favorites for one session id from db
  // console.log('req.seesionID: ', typeof req.sessionID)

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
  // console.log('sessionID: ', req.sessionID)
  // console.log('req.body: ', req.body);
  try {
    const result = await insertOne(req.body, req.sessionID)
    console.log('result: ', result[0].affectedRows);
    res.send({
      message: 'SUCCESS',
      result: result[0].affectedRows,
      session: req.sessionID,
    })
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to add location: ', err);
  }
}

exports.deleteOneFavorite = async (req, res, next) => { // delete one favorte from db
  // console.log('sessionID: ', req.sessionID)
  console.log('index: ', req.query.id);
  try {
    const result = await deleteOne('sessions', 'favorites', req.sessionID, req.query.id)
    console.log('result: ', result[0]);
    if (result) {
      // console.log('result: ', result);
      res.send({
        message: 'FAVORITE DELETED FROM DB',
        result: result[0],
      })
    }
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to delete location: ', err);
  }
}


//   INSERT INTO `locations`
// (`location_id`,
// `session_id`,
// `name`,
// `fetch_url`,
// `lat`,
// `lng`)
// VALUES
// (<{location_id: }>,
// <{session_id: }>,
// <{name: }>,
// <{fetch_url: }>,
// <{lat: }>,
// <{lng: }>);
