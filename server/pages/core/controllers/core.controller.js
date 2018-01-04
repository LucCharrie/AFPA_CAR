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
 * Sign-in Authentication Redirection
 */
module.exports.authentication = function(req, res) {
  req.checkBody('email', 'Adresse email invalide').isEmail();
  req.checkBody('password', 'Mot de passe vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.render('core/views/signin', {'errorsFields': errorsFields});
  }

  UsersAuthService.checkAccount(req.body.email, req.body.password, (err, user) => {
    if (err) {
      res.render('core/views/signin', {'errors': [{msg: 'Echec de connexion'}]});
    }
    else {
      req.session.user = user;
      res.redirect('/home');
    }
  });
};


/**
 * Sign-up Page
 */
module.exports.signup = function(req, res) {
  res.render('core/views/signup');
}


/**
 * Sign-up Registration
 */
module.exports.registration = function(req, res) {
  req.checkBody('email', 'Adresse email invalide').isEmail();
  req.checkBody('username', 'Nom utilisateur vide').notEmpty();
  req.checkBody('firstname', 'Prenom vide').notEmpty();
  req.checkBody('lastname', 'Nom vide').notEmpty();
  req.checkBody('password', 'Mot de passe vide').notEmpty();
  req.checkBody('passwordConfirmation', 'Le mot de passe de confirmation doit etre identique au mot de passe')
    .notEmpty()
    .matches(req.body.password);

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.render('core/views/signup', {'errorsFields': errorsFields});
  }

  let userModel = new UserModel({
    email: req.body.email,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });

  UsersRegisterService.register(userModel, (err, user) => {
    if (err) {
      console.log(err);
      res.render('core/views/signup', {'errors': [{msg: 'Echec lors de l\'inscription'}]});
    }
    else {
      res.redirect('/signin');
    }
  });
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
