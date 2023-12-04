const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log('sessionID: ', req.sessionID);
    console.log('sessionStore: ', req.sessionStore);
    res.send({ message: 'Elements Weather API' });
  });

  module.exports = router;