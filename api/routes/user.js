const express = require('express');
const router = express.Router();
const db = require('../../db/database')

router.get('/user', function (req, res) {

  res.send({ message: 'GET USER BY ID FROM DB' });
});

// POST saved location for a user
router.post('/user', function (req, res) {
  // console.log('request: ', req);
  res.send({ message: 'POST USER TO DB' });
});

router.put('/user', function (req, res) {
    res.send({ message: 'UPDATE USER IN DB' });
  });

router.delete('/user', function (req, res) {

  res.send({ message: 'DELETE USER FROM DB' });
});