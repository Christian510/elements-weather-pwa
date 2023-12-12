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
    sessionID: req.sessionID,
  });
});

router.get('/user', function (req, res) {

  res.send({ message: 'GET USER BY ID FROM DB' });
});

// POST saved location for a user
router.post('/user', function (req, res) {
  console.log('request: ', req);
  res.send({ message: 'POST USER TO DB' });
});

router.put('/user', function (req, res) {
    res.send({ message: 'UPDATE USER IN DB' });
  });

router.delete('/user', function (req, res) {

  res.send({ message: 'DELETE USER FROM DB' });
});

// GET saved locations for a user
router.get('/locations', function (req, res) {
  console.log('request: ', req.body);
  console.log('sessionID: ', req.sessionID)

  // Replace this with a call to the database
  // const locations = {
  //   "saved_locations": [
  //     {
  //       "name": "Boise, ID",
  //       "coords": {
  //         "lat": "43.6135",
  //         "lng": "-116.20345"
  //       },
  //       "id": "5586437"
  //     },
  //     {
  //       "name": "Hail, TX",
  //       "coords": {
  //         "lat": "33.50094",
  //         "lng": "-96.05747"
  //       },
  //       "id": "5334958"
  //     },
  //     {
  //       "name": "Seattle, WA",
  //       "coords": {
  //         "lat": "47.60621",
  //         "lng": "-122.33207"
  //       },
  //       "id": "5334888"
  //     },
  //     {
  //       "name": "Sandpoint, ID",
  //       "coords": {
  //         "lat": "48.27659",
  //         "lng": "-116.55325"
  //       },
  //       "id": "4954958"
  //     }
  //   ]
  // }
  res.send({
    message: 'GET LOCATIONS FROM DB',
  });
});

router.post('/location', function (req, res) {

  res.send({ message: 'POST A LOCATION TO DB' });
});

router.delete('/location', function (req, res) {

  res.send({ message: 'DELETE A LOCATION FROM DB' });
});

router.post('/login', function (req, res) {

  res.send({ message: 'LOGIN USER' });
});

router.put('/login', function (req, res) {

  res.send({ message: 'LOGOUT USER' });
});

router.post('/create_account', function (req, res) {
  res.send({ message: 'CREATE ACCOUNT' });
});

module.exports = router;
