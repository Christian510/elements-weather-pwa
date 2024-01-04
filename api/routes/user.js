const express = require('express');
const router = express.Router();
const db = require('../../db/database')

router.get('/user', function (req, res) {

  res.send({ message: 'GET USER BY ID FROM DB' });
});

// POST saved location for a user
router.post('/add', function (req, res) {
  // console.log('request: ', req);
  res.send({ message: 'POST USER TO DB' });
});

router.put('/update', function (req, res) {
    res.send({ message: 'UPDATE USER IN DB' });
  });

router.delete('/delete', function (req, res) {

  res.send({ message: 'DELETE USER FROM DB' });
});

router.post('/login', function (req, res) {

  res.send({ message: 'LOGIN USER' });
});

router.put('/logout', function (req, res) {

  res.send({ message: 'LOGOUT USER' });
});

router.post('/create_account', function (req, res) {
  res.send({ message: 'CREATE ACCOUNT' });
});

module.exports = router;