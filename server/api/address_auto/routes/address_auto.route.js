var express = require('express');
var router = express.Router();
var addressAutoCtrl = require('../controllers/address_auto.controller');

router.route('/')
    .get(addressAutoCtrl.search);

module.exports = router;