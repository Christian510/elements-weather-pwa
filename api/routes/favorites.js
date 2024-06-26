const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites')


router.get('/all', favoritesController.fetchFavorites);

router.post('/add-one', favoritesController.addOneFavorite);

router.delete('/delete-one/', favoritesController.deleteOneFavorite);


module.exports = router;