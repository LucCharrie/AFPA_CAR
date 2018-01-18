var express = require('express');
var router = express.Router();
var addressCtrl = require('../controllers/address.controller');

router.route('/me')
    .get(addressCtrl.create);

module.exports = router;