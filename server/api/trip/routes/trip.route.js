var express = require('express');
var router = express.Router();
var tripCtrl = require('../controllers/trip.controller');

router.param('idTrip', tripCtrl.tripByID);

router.route('/')
    .get(tripCtrl.list)

router.route('/:idTrip')
    .get(tripCtrl.read)
    .post(tripCtrl.update)
    .delete(tripCtrl.delete);


module.exports = router;