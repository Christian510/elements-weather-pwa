
const db = require('../db/database')


exports.fetchFavorites = async (req, res, next) => {
  console.log('sessionID: ', req.sessionID)
  try {
    const result = await db.query(`SELECT * FROM locations WHERE session_id = "${req.sessionID}"`);
    console.log('result: ', result[0]);
    // pool.end();
    return result[0];
  }
  catch (error) {
    console.error('Error fetching locations:', error);
    throw error; // Re-throw to handle it appropriately in calling code
  }
  // return db.query(`SELECT * FROM locations WHERE session_id = "${req.sessionID}"`)
  //   .then(result => res.send({
  //     message: 'GET FAVORITES FROM DB',
  //     locations: result[0],
  //   })
  //   )
  //   .catch(err => {
  //     console.log('error msg: ', err)
  //   });
  db.end();
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
  [req.body.id, req.sessionID ] )
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
