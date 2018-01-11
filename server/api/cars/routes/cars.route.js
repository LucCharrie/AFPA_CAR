let express = require('express');
let router = express.Router();
let cars = require('../controllers/cars.controller');

router.route('/')
    .get(cars.list);

// router.route('/:idCar')
//     .get(cars.read);

//router.param(':idUser', carByID);

module.exports = router;