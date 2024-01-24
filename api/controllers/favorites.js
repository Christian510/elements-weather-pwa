
const db = require('../db/database').pool;
const findAllById = require('../db/database').findAllById;
const findOneById = require('../db/database').findOneById;

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
exports.addOneFavorite = (req, res, next) => {
  // console.log('sessionID: ', req.sessionID)
  console.log('body: ', req.body);
  // Check for session id in sessions table
  // Join locations table and sessions table
  // insert one location into locations table
  const sessionID = findOneById('sessions', 'session_id', req.sessionID)
    .then(result => {
      console.log('session: ', result)
      return result;
    });
  const locationID = findOneById('locations', 'location_id', req.body.id)
    .then(result => {
      console.log('location: ', result)
      return result;
    });
    console.log('sessionID: ', sessionID)
    console.log('locationID: ', locationID)
    // if (sessionID && !locationID) {
    //   console.log('sessionID: ', sessionID)
    //   console.log('locationID: ', locationID)
    // }
  // return db.execute(`
  // SELECT *
  // FROM locations
  // JOIN sessions ON locations.session_id = sessions.session_id
  // WHERE locations.location_id = :location_id AND sessions.session_id = :session_id`,
  //   [req.body.id, req.sessionID])
  //   .then(result => {
  //     console.log('result: ', result)
  //     // return result;
  //     // res.send({
  //     //   message: 'POST A LOCATION TO DB',
  //     //   result: result,
  //     // });
  //   })
  //   .catch(err => {
  //     console.log('error msg: ', err)
  //   });
}

exports.deleteOneFavorite = (req, res, next) => {
  console.log('sessionID: ', req.sessionID)
  // if session id exists in sessions table,
  // and if forecast id exists in forecast table,
  // delete one favorite forecast from forecast table

  // db.end();
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
