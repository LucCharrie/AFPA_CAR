var express = require('express');
var router = express.Router();
var cars = require('../controllers/cars-user.controller');

router.route('/')
    .get(cars.index);

router.route('/:idCar')
    .get(cars.show);

module.exports = router;
