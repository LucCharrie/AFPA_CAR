let express = require('express');
let router = express.Router();
let cars = require('../controllers/cars.controller');

router.route('/')
    .get(cars.search);

module.exports = router;