var express = require('express');
var router = express.Router();
var addressAutoCtrl = require('../controllers/addresses-autocomplete.controller');

router.route('/')
    .get(addressAutoCtrl.search);

module.exports = router;