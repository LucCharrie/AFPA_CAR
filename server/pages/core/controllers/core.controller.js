let UserModel = require(__base + 'api/users/models/user.model');
let UsersAuthService = require(__base + 'api/users/services/users.auth.service');
let UsersRegisterService = require(__base + 'api/users/services/users.register.service');


/**
 * Index
 */
module.exports.index = function(req, res) {
  res.redirect('/signin');
}


/**
 * Sign-in Page
 */
module.exports.signin = function(req, res) {
  res.render('core/views/signin');
}


/**
 * Sign-up Page
 */
module.exports.signup = function(req, res) {
  res.render('core/views/signup');
}


/**
 * Home Page
 */
module.exports.home = function(req, res) {
  res.render('core/views/home', { user: req.session.user });
};


/**
 * Profil Page
 */
module.exports.profil = function(req, res) {
  res.render('core/views/profil');
};


/**
 * Notifications Page
 */
module.exports.notifications = function(req, res) {
  res.render('core/views/notifications');
};

/**
 * Addresses Page
 */
module.exports.addresses = function(req, res) {
  res.render('core/views/addresses-user');
};