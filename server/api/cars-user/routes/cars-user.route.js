let express = require('express');
let router = express.Router();
let carsUserCtrl = require('../controllers/cars-user.controller');
let carsUserPolicy = require('../policies/cars-user.policy');

//
// Globals CarsUser route
//
router.route('/me')
    .get(carsUserCtrl.listCurrentUser);

router.route('/').all(carsUserPolicy.isAllowed)
    .get(carsUserCtrl.list)
    .post(carsUserCtrl.create);

//
// Single's CarsUser route
//

// Routage évolué : avant de checker les droits....
// ## induit l'appel de : exports.carUserByID = function (req, res, next, idCarUser) {....
// ## avant la route ci-dessous router.route('/:idCarUser').all(carsUser
router.param('idCarUser', carsUserCtrl.carUserByID); 

// l'ordre de ces deux instructions importe peu .....
router.route('/:idCarUser').all(carsUserPolicy.isAllowed).all(carsUserPolicy.isOwner)
    .get(carsUserCtrl.read)
    .put(carsUserCtrl.update)
    .delete(carsUserCtrl.delete);

module.exports = router;