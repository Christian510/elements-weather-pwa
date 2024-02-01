
const db = require('../db/database').pool;
const findAllById = require('../db/database').findAllById;
const findOneById = require('../db/database').findOneById;
const insertOne = require('../db/database').insertOne;
const deleteOne = require('../db/database').deleteOne;

exports.fetchFavorites = (req, res, next) => {
  // console.log('req.seesionID: ', req.sessionID)

  return findAllById('locations', 'session_id', req.sessionID)
    .then(data => {
      // console.log('result: ', data);
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

// if session id exists in sessions table, 
// if forecast id does not exist in forecast table,
// add one favorite forecast to forecast table
exports.addOneFavorite = async (req, res, next) => {
  // console.log('sessionID: ', req.sessionID)
  // console.log('body: ', req.body);
  try {
    const sessionData = await findOneById('sessions', 'session_id', req.sessionID)
    console.log('sessionData: ', sessionData[0])
    if (sessionData[0].session_id === req.sessionID) {
        const keys = ['location_id', 'session_id', 'name', 'fetch_url', 'lat', 'lng'];
        const values = [req.body.id, req.sessionID, req.body.name, req.body.url, req.body.lat, req.body.lng];
        const result = await insertOne('locations', keys, values)
        console.log('result: ', result);
        res.send({
          message: 'SUCCESS',
          session: req.sessionID,
        })
      }
      if(locationID) {
        console.log('location already exists');
        return;
      }
    // }
  }
  catch (err) {
    console.log('error msg: ', err)
    throw new Error('Unable to add location: ', err);
  }
}

exports.deleteOneFavorite = async (req, res, next) => {
  console.log('sessionID: ', req.sessionID)
  console.log('location_id: ', req.query.id);
  try {
    const result = await deleteOne('locations', 'location_id', req.sessionID, req.query.id)
    console.log('result: ', result);
    if (result) {
      console.log('result: ', result);
      res.send({
        message: 'LOCATION DELETED FROM DB',
        result: result,
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
