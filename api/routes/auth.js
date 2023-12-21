const express = require('express');
const router = express.Router();
const db = require('../../db/database')

router.post('/login', function (req, res) {

    res.send({ message: 'LOGIN USER' });
  });
  
  router.put('/login', function (req, res) {
  
    res.send({ message: 'LOGOUT USER' });
  });
  
  router.post('/create_account', function (req, res) {
    res.send({ message: 'CREATE ACCOUNT' });
  });