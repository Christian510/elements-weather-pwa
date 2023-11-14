const express = require('express');
const router = express.Router();

router.get('/users', function(req, res, next) {
  res.send({ message: 'GET USER' });
});

module.exports = router;