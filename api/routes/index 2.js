var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send ({
    title: 'Elements Weather API',
    message: 'Welcome to the Elements Weather API!'
  });
});

module.exports = router;
