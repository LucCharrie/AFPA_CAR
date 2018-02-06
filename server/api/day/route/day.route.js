var express = require('express');
var router = express.Router();
let dayCtrl = require('../controllers/day.controller');


console.log('0 ROUTE');


router.param('idDay', dayCtrl.findById);

router.route('/:idDay').get(dayCtrl.read);



module.exports = router;