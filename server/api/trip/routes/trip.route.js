var express = require('express');
var router = express.Router();
var tripCtrl = require('../controllers/trip.controller');

router.route('/')
    .get(tripCtrl.list)

router.route('/:idTrip')
    .get(tripCtrl.read)
    .delete(tripCtrl.delete);

router.param('idTrip', tripCtrl.tripByID);


module.exports = router;