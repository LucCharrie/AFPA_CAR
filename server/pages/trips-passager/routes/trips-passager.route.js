'use strict';

let express = require('express');
let tripsPassagerCtrl = require('../controllers/trips-passager.controller');
let tripsPassagerPolicies = require('../policies/trips-passager.policies');
let router = express.Router();


/**
 * Trips driver routes
 */
router.route('/')
  .get(tripsPassagerCtrl.index);

router.route('/create')
  .get(tripsPassagerCtrl.create);

module.exports = router;