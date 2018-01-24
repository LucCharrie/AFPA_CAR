'use strict';

let express = require('express');
let tripsDriverCtrl = require('../controllers/trips-driver.controller');
let tripsDriverPolicies = require('../policies/trips-driver.policies');
let router = express.Router();


/**
 * Trips driver routes
 */
router.route('/')
  .get(tripsDriverCtrl.index);

  router.route('/edit/:idTripFavorite')
  .get(tripsDriverCtrl.edit);

router.route('/create')
  .get(tripsDriverCtrl.create);

module.exports = router;