var express = require('express');
var router = express.Router();
var addressCtrl = require('../controllers/address.controller');

router.route('/')
    .get(addressCtrl.list);

module.exports = router;