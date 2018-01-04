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
  .post(coreCtrl.authentication);

router.route('/signup')
  .get(coreCtrl.signup)
  .post(coreCtrl.registration);

router.route('/home')
  .get(coreCtrl.home);

router.route('/profil')
  .get(coreCtrl.profil);

router.route('/notifications')
  .get(coreCtrl.notifications);

module.exports = router;