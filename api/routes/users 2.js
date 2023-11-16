var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Send User Data and do stuff with it');
});

module.exports = router;
