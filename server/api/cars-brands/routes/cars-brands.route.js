let express = require('express');
let router = express.Router();
let cars_brands = require('../controllers/cars-brands.controller');

router.route('/')
    .get(cars_brands.list);

router.route('/:idBrand')
    .get(cars_brands.read);

//router.param(':idUser', carByID);

module.exports = router;