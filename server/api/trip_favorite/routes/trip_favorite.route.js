var express = require('express');
var router = express.Router();
var tripFavoriteCtrl = require('../controllers/trip_favorite.controller');


router.route('/')
        .get(tripFavoriteCtrl.tripByUserId)
        .post(tripFavoriteCtrl.create);

router.route('/:idTripFavorite')
        .get(tripFavoriteCtrl.read)
        .delete(tripFavoriteCtrl.delete);

router.param('idTripFavorite', tripFavoriteCtrl.tripByID);


module.exports = router;