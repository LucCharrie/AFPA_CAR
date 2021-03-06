var express = require('express');
var router = express.Router();
var cars = require('../controllers/cars-user.controller');


router.route('/create')
    .get(cars.create);

router.route('/')
    .get(cars.list);

router.route('/edit/:idCarUser')
    .get(cars.edit);

module.exports = router;