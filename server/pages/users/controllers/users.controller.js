let UsersService = require(__base + 'api/users/services/users.service');

/**
 * users index page
 */
module.exports.index = function(req, res) {
    res.render('users/views/index', { user: req.session.user });
}