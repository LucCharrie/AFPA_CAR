var express = require('express');
var router = express.Router();
var users = require('../controllers/users.controller');

router.route('/')
    .get(users.index);

module.exports = router;
