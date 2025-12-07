const express = require('express');
const { fetchOneElmIcon, fetchAllElmIcons } = require('../controllers/elmIcons.js');

const router = express.Router();

router.get('/oneIcon', fetchOneElmIcon);

router.get('/allIcons', fetchAllElmIcons);

module.exports = router;