'use strict';

let express = require('express');
let tripsFavoriteCtrl = require('../controllers/trips-favorite.controller');
let tripsFavoritePolicy = require('../policies/trips-favorite.policies');
let router = express.Router();


/**
 * Trips Favorite routes
 */
router.route('/')//.all(tripsFavoritePolicy.isAllowed)
  .get(tripsFavoriteCtrl.index);

router.route('/edit/:idTripFavorite')
  .get(tripsFavoriteCtrl.edit);

router.route('/create')
  .get(tripsFavoriteCtrl.create);

module.exports = router;