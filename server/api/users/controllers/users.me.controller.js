let UsersService = require('../services/users.service');
let UserModel = require('../models/user.model');

module.exports.read = function(req, res) {
    res.json(req.session.user);
}

module.exports.update = function(req, res) {
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
    return res.status(500).json({'errors': errorsFields});
  }

  let userModel = new UserModel({
    id_user: req.session.user.id,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    gender: req.body.gender,
    birthday: req.body.birthday,
    mobile_phone: req.body.mobile,
    login: req.body.login,
    email: req.body.email,
    formation_id: req.body.formation
  });

  if (!userModel.isValid()) {
    return res.status(500).json({ 'errors': [{msg: 'Failed to update user !'}] });
  }

  UsersService.update(userModel, (err, user) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to update user !'}] });
    } else {
      req.session.user = user;
      res.json({ 'success': [{msg: 'User Updated !'}], 'user': user });
    }
  });
}

// module.exports.disconnection = function(req, res) {
//   userSession = "";
//   .done(function() {
//     window.location.replace('/home');
//   }
// }
