//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let UsersService = require('../services/users.service');
let UserModel = require('../models/user.model');


/**
 * Create a user
 */
module.exports.create = function(req, res) {
  let userModel = new UserModel(req.body);

  if (!userModel.isValid()) {
    return res.status(500).json({ 'error': 'Failed to create user, missing fields !' });
  }

  UsersService.create(userModel, (err, user) => {
    if (err) {
      res.status(500).json({ 'error': 'Failed to create user !' });
    } else {
      res.json({ 'success': 'User created !', 'user': user });
    }
  });
}


/**
 * Read a user
 */
module.exports.read = function(req, res) {
  res.json(req.user);
}


/**
 * Update a user
 */
module.exports.update = function(req, res) {
console.log('test');

  req.checkBody('lastname', 'Nom vide').notEmpty();
  req.checkBody('firstname', 'Prenom vide').notEmpty();
  req.checkBody('gender', 'Sexe vide').notEmpty();
  req.checkBody('birthday', 'Date de naissance vide').notEmpty();
  req.checkBody('mobile', 'Mobile vide').notEmpty();
  req.checkBody('login', 'Nom utilisateur vide').notEmpty();
  req.checkBody('email', 'Email vide').isEmail();
  req.checkBody('formation', 'Formation vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.json({'errorsFields': errorsFields});
  }

  let userModel = new UserModel({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    gender: req.body.gender,
    birthday: req.body.birthday,
    mobile_phone: req.body.mobile,
    login: req.body.login,
    email: req.body.email,
    formation_id: req.body.formation
  });

  console.log(userModel);

  if (!userModel.isValid()) {
    return res.status(500).json({ 'error': 'Failed to update user, missing fields !' });
  }

  userModel.id = req.params.idUser;

  UsersService.update(userModel, (err, user) => {
    if (err) {
      res.status(500).json({ 'error': 'Failed to update user !' });
    } else {
      res.json({ 'success': 'User updated !', 'user': user });
    }
  });
}


/**
 * Delete a user
 */
module.exports.delete = function(req, res) {
  UsersService.delete(req.user.id, (err, user) => {
    if (err) {
      res.status(500).json({ 'error': 'Failed to delete user !' });
    } else {
      res.json({ 'success': 'User deleted !', 'user': user });
    }
  });
}


/**
 * List of users
 */
module.exports.list = function(req, res) {
  UsersService.list((err, users) => {
    res.json(users);
  });
}


/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (isNaN(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  UsersService.findById(id, (err, user) => {
    if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.user = user;
    next();
  });
};