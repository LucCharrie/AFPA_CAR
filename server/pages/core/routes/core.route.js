'use strict';

let express = require('express');
let coreCtrl = require('../controllers/core.controller');
let corePolicies = require('../policies/core.policies');
let router = express.Router();


/**
 * Core routes
 */
router.route('/')
  .get(coreCtrl.index);

router.route('/signin')
  .get(coreCtrl.signin)

router.route('/signup')
  .get(coreCtrl.signup)

router.route('/home')
  .get(coreCtrl.home);

router.route('/notifications')
  .get(coreCtrl.notifications);

module.exports = router;