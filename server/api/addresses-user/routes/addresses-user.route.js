let express = require('express');
let router = express.Router();
let addressesUserCtrl = require('../controllers/addresses-user.controller');
let addressesUserMeCtrl = require('../controllers/addresses-user-me.controller');

router.route('/me')
    .get(addressesUserMeCtrl.list)
    .post(addressesUserMeCtrl.create);

router.route('/me/:idAddressesUser')
    .delete(addressesUserMeCtrl.delete);

router.route('/me/createGPS')
    .get(addressesUserMeCtrl.createGPS);

// router.param(':idAdress', carByID);

module.exports = router;