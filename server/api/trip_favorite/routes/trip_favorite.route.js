var express = require('express');
var router = express.Router();
var tripFavoriteCtrl = require('../controllers/trip_favorite.controller');

router.param('idTripFavorite', tripFavoriteCtrl.idTripFavorite);

router.route('/')
        .get(tripFavoriteCtrl.list)
        .post(tripFavoriteCtrl.create);

router.route('/:idTripFavorite')
        .get(tripFavoriteCtrl.read)
        .put(tripFavoriteCtrl.update)
        .delete(tripFavoriteCtrl.delete);

module.exports = router;