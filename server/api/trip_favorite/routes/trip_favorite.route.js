var express = require('express');
var router = express.Router();
var tripFavoriteCtrl = require('../controllers/trip_favorite.controller');
var usersCtrl = require('../../users/controllers/users.controller');


router.route('/').get(tripFavoriteCtrl.list).post(tripFavoriteCtrl.create);

router.route('/:idTripFavorite').delete(tripFavoriteCtrl.delete);

router.param('idTripFavorite', tripFavoriteCtrl.tripByID);


module.exports = router;