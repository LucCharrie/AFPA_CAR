var express = require('express');
var router = express.Router();
var addresses = require('../controllers/addresses-user.controller');


router.route('/create')
    .get(addresses.create);

router.route('/createGPS')
    .get(addresses.createGPS);  
    
router.route('/edit')
    .get(addresses.edit);  


router.route('/')
    .get(addresses.list);
    
// router.route('/createGPS')
//     .get(addresses.update)

module.exports = router;
