const express = require('express');
const router = express.Router();
const db = require('../../db/database')

// GET saved locations for a user
router.get('/all', function (req, res) {
  console.log('/favorites/all GET request')
  // console.log('sessionID: ', req.sessionID)
  // document.cookie = 'sessionID=' + req.sessionID
  // console.log('cookie: ', document.cookie);

  return db.execute(`SELECT * FROM locations WHERE session_id = "${req.sessionID}"`)
    .then(result => res.send({
      message: 'GET FAVORITES FROM DB',
      locations: result[0],
      session: req.sessionID,
    })
    )
    .catch(err => {
      console.log('error msg: ', err)
    });

});

router.post('/add-one/:id', function (req, res) {
  console.log('sessionID: ', req.sessionID)
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
});

router.delete('/delete-one/:id', function (req, res) {
  res.send({ message: 'DELETE A LOCATION FROM DB' });
});


module.exports = router;