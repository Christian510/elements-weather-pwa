
const e = require('express');
// const db = require('../db/database').pool;
const getFavorites = require('../db/database').getFavorites;

exports.fetchFavorites = (req, res, next) => {
  console.log('sessionID: ', req.sessionID)

  return getFavorites(req.sessionID)
    .then(result => {
      console.log('result: ', result);
      if (res.status(200)) {
        res.send({
          message: 'GET FAVORITES FROM DB',
          locations: result,
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
  // console.log('body: ', req.body);
  return db.execute(`
  SELECT *
  FROM locations
  JOIN sessions ON locations.session_id = sessions.session_id
  WHERE locations.location_id = :location_id AND sessions.session_id = :session_id`,
    [req.body.id, req.sessionID])
    .then(result => {
      console.log('result: ', result)
      // return result;
      // res.send({
      //   message: 'POST A LOCATION TO DB',
      //   result: result,
      // });
    })
    // .then(data => {
    // console.log('data: ', data)
    // return db.execute(`SELECT * FROM locations WHERE location_id = "${req.body.location_id}"`)
    // })
    .catch(err => {
      console.log('error msg: ', err)
    });

  // res.send({
  //   message: 'POST A LOCATION TO DB'
  // });
  // db.end();
}

exports.deleteOne = (req, res, next) => {
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
