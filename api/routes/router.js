const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log('sessionID: ', req.sessionID);
    console.log('sessionStore: ', req.sessionStore);
    res.send({ message: 'Elements Weather API' });
  });

  router.get('/users', function(req, res) {
    // console.log('request: ', req);
    res.send({ message: 'GET USERS FROM DB' });
  });

  module.exports = router;