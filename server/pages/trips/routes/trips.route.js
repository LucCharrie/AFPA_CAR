'use strict';

let express = require('express');
let tripsCtrl = require('../controllers/trips.controller');
let tripsPolicies = require('../policies/trips.policies');
let router = express.Router();


/**
 * Trips driver routes
 */
router.route('/')
  .get(tripsCtrl.index);

router.route('/edit')
 // .get(tripsCtrl.create);

module.exports = router;