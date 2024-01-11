
const db = require('../../db/database')


exports.fetchFavorites = (req, res, next) => {
    console.log('sessionID: ', req.sessionID)
    return db.execute(`SELECT * FROM locations WHERE session_id = "${req.sessionID}"`)
    .then(result => res.send({
      message: 'GET FAVORITES FROM DB',
      locations: result[0],
    })
    )
    .catch(err => {
      console.log('error msg: ', err)
    });
    db.end();
  }

  exports.addOneFavorite = (req, res, next) => {
    // console.log('sessionID: ', req.sessionID)
    console.log('body: ', req.body);
    // if session id exists in sessions table, 
    // if forecast id does not exist in forecast table,
    // add one favorite forecast to forecast table

    // console.log('sessionID: ', req.sessionID)
    db.execute(`SELECT * FROM sessions`)
    .then(result => {
      console.log('result: ', result[0])
      console.log('sesstionID: ', req.sessionID)
      res.send({
        message: 'POST A LOCATION TO DB',
        result: result,
      });
    })
    
    res.send({
      message: 'POST A LOCATION TO DB'
    });
    // db.end();
    }

  exports.deleteOne = (req, res, next) => {
    console.log('sessionID: ', req.sessionID)
    // if session id exists in sessions table,
    // and if forecast id exists in forecast table,
    // delete one favorite forecast from forecast table

    // db.end();
  }

  