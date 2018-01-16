let express = require('express');
let router = express.Router();
let carsUserCtrl = require('../controllers/cars-user.controller');
let carsUserMeCtrl = require('../controllers/cars-user-me.controller');

router.route('/me')
    .get(carsUserMeCtrl.list)
    .post(carsUserMeCtrl.create);

router.route('/me/:idCarUser')
    .delete(carsUserMeCtrl.delete);

// router.route('/:idCar')
//     .get(cars.read);

//router.param(':idUser', carByID);

module.exports = router;