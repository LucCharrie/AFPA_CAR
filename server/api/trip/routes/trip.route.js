var express = require('express');
var router = express.Router();
var tripCtrl = require('../controllers/trip.controller');

router.route('/')
    .get(tripCtrl.list);

module.exports = router;