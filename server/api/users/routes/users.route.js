var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users.controller');

router.route('/')
    .get(usersCtrl.list)
    .post(usersCtrl.create);

router.route('/auth')
    .post(usersCtrl.auth);

router.route('/:idUser')
    .get(usersCtrl.read)
    .put(usersCtrl.update)
    .delete(usersCtrl.delete);

router.param('idUser', usersCtrl.userByID);

module.exports = router;