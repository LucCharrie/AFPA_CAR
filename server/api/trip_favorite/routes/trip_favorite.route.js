var express = require('express');
var router = express.Router();
var tripFavoriteCtrl = require('../controllers/trip_favorite.controller');

router.param('idTripFavorite', tripFavoriteCtrl.tripByID);

router.route('/')
        .get(tripFavoriteCtrl.tripByUserId)
        .post(tripFavoriteCtrl.create);

router.route('/list')
        .get(tripFavoriteCtrl.list)

router.route('/:idTripFavorite')
        .get(tripFavoriteCtrl.read)
        .delete(tripFavoriteCtrl.delete);



module.exports = router;