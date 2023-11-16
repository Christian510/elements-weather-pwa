const express = require('express');
const router = express.Router();

router.get('users/', function(req, res) {
  console.log('request: ', req);
  res.send({ message: 'GET USERS FROM DB' });
});

module.exports = router;