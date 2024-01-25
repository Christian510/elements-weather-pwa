
const db = require('../db/database').pool;
const findAllById = require('../db/database').findAllById;
const findOneById = require('../db/database').findOneById;
const insertOne = require('../db/database').insertOne;

exports.fetchFavorites = (req, res, next) => {
  console.log('req.seesionID: ', req.sessionID)

  return findAllById('locations', 'session_id', req.sessionID)
    .then(data => {
      console.log('result: ', data);
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
      const locationID = await findOneById('locations', 'location_id', req.body.id)
      console.log('locationID: ', locationID);
      if (locationID == null) {
        console.log('success');
        const keys = ['session_id', 'name', 'fetch_url', 'lat', 'lng'];
        const values = [req.sessionID, req.body.name, req.body.fetch_url, req.body.lat, req.body.lng];
        const result = await insertOne('locations', keys, values)
        console.log('result: ', result);
      }
    }
  }
  catch (err) {
    console.log('error msg: ', err)
  }
    
  // const locationID = findOneById('locations', 'location_id', req.body.id)
  //   .then(result => {
  //     // console.log('location: ', result)
  //     return result;
  //   });

  //   res.send({
  //     message: 'ADD A LOCATION TO DB',
  //     session: sessionID,
  //     location: locationID,
  //   })
    // if (sessionID && !locationID) {
    //   console.log('sessionID: ', sessionID)
    //   console.log('locationID: ', locationID)
    // }
}

exports.deleteOneFavorite = (req, res, next) => {
  console.log('sessionID: ', req.sessionID)
  // if session id exists in sessions table,
  // and if forecast id exists in forecast table,
  // delete one favorite forecast from forecast table
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
