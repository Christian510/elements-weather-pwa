const express = require('express');
const router = express.Router();
const db = require('../db/database').pool;
const favoritesController = require('../controllers/favorites')

// GET saved locations for a user
// router.get('/all', function (req, res) {
//   console.log('/favorites/all GET request')
//   // console.log('sessionID: ', req.sessionID)
//   // document.cookie = 'sessionID=' + req.sessionID
//   // console.log('cookie: ', document.cookie);

//   return db.execute(`SELECT * FROM locations WHERE session_id = ?`, [req.sessionID])
//     .then(result => res.send({
//       message: 'GET FAVORITES FROM DB',
//       locations: result[0],
//       session: req.sessionID,
//     })
//     )
//     .catch(err => {
//       console.log('error msg: ', err)
//     });

// });

router.get('/all', favoritesController.fetchFavorites);


router.post('/add-one', favoritesController.addOneFavorite);

router.delete('/delete-one/:id', function (req, res) {
  res.send({ message: 'DELETE A LOCATION FROM DB' });
});


module.exports = router;