let express = require('express');
let router = express.Router();
let addressesUserCtrl = require('../controllers/addresses-user.controller');
let addressesUserMeCtrl = require('../controllers/addresses-user-me.controller');

router.route('/create')
    //.get(addressesUserMeCtrl.list)
    .post(addressesUserCtrl.create);
    //.put(addressesUserCtrl.createGPS);

router.route('/me')
    .get(addressesUserMeCtrl.list)
    .post(addressesUserMeCtrl.delete);

router.route('/:data')
    .delete(addressesUserMeCtrl.delete);

router.route('/createGPS')
    .post(addressesUserCtrl.createGPS);

router.param('data', addressesUserMeCtrl.parseData);

module.exports = router;