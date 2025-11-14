/*
 * favorites.js
 *
 * @description: Favorites routes
 *
 * @description: This file contains the routes for the favorites.
 */

const express = require('express');
const { fetchFavorites, addOneFavorite, deleteOneFavorite } = require('../controllers/favorites.js');

const router = express.Router();

router.get('/all', fetchFavorites);

router.post('/add-one', addOneFavorite);

router.delete('/delete-one/', deleteOneFavorite);

module.exports = router;