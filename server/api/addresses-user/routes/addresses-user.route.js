let express = require('express');
let router = express.Router();
let addressesUserCtrl = require('../controllers/addresses-user.controller');
let addressesUserMeCtrl = require('../controllers/addresses-user-me.controller');

router.route('/')
    //.get(addressesUserMeCtrl.list)
    .post(addressesUserCtrl.create);

router.route('/:idAddressesUser')
    .delete(addressesUserMeCtrl.delete);

router.route('/createGPS')
    .get(addressesUserMeCtrl.createGPS);

// router.param(':idAdress', carByID);

module.exports = router;