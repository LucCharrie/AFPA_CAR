let UsersService = require(__base + 'api/users/services/users.service');

/**
 * users index page
 */
module.exports.index = function(req, res) {    
    let user = req.session.user;
    user.birthday = user.birthday.slice(0, 10);

    res.render('users/views/index', { user: user });
}