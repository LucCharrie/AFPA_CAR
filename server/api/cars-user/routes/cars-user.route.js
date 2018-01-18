let express = require('express');
let router = express.Router();
let carsUserCtrl = require('../controllers/cars-user.controller');
let carsUserMeCtrl = require('../controllers/cars-user-me.controller');

//
// Routes for current user (Me)
//
router.route('/me')
    .get(carsUserMeCtrl.list);

router.route('/me/:idCarUserMe')
    .get(carsUserCtrl.read)
    .put(carsUserCtrl.update)
    .delete(carsUserCtrl.delete);

router.param('idCarUserMe', carsUserMeCtrl.carUserByID);

//
// Globals cars-user route
//
router.route('/')
    .get(carsUserCtrl.list)
    .post(carsUserCtrl.create);

router.route('/:idCarUser')
    .get(carsUserCtrl.read)
    .put(carsUserCtrl.update)
    .delete(carsUserCtrl.delete);

router.param('idCarUser', carsUserCtrl.carUserByID);

module.exports = router;