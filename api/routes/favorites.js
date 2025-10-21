// import express from 'express';
// import { fetchFavorites, addOneFavorite, deleteOneFavorite } from '../controllers/favorites.js';

const express = require('express');
const { fetchFavorites, addOneFavorite, deleteOneFavorite } = require('../controllers/favorites.js');

const router = express.Router();

router.get('/all', fetchFavorites);

router.post('/add-one', addOneFavorite);

router.delete('/delete-one/', deleteOneFavorite);

// export default router;
module.exports = router;