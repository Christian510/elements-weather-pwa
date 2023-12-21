const express = require('express');
const router = express.Router();
const db = require('../../db/database')

router.get('/index', function (req, res) {
  // console.log('sessionID: ', req.sessionID);
  // console.log('sessionStore: ', req.sessionStore);

  // db.execute('SELECT * FROM sessions')
  // .then(reuslt => {
  //   console.log(result)
  // })
  // .catch(err => {
  //   console.log('error msg: ', err)
  // })

  res.send({
    message: 'Elements Weather API',
    // sessionID: req.sessionID,
  });
});

// GET saved locations for a user
router.get('/favorites', function (req, res) {
  // console.log('request: ', req.body);
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
  console.log('serversideresponse: ', response)

});

router.post('/favorite', function (req, res) {
  console.log('sessionID: ', req.sessionID)
  db.execute(`SELECT * FROM sessions`)
    .then(result => {
      console.log('result: ', result[0])
      console.log('sesstionID: ', req.sessionID)
      // return result[0][0]
    })

  res.send({
    message: 'POST A LOCATION TO DB'
  });
});

router.delete('/favorite', function (req, res) {
  res.send({ message: 'DELETE A LOCATION FROM DB' });
});


module.exports = router;
