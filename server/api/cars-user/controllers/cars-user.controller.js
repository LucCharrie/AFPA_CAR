//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let CarsUserService = require('../services/cars-user.service');
let CarUserModel = require('../models/car-user.model');

/**
 * Create a CarUser
 */
module.exports.create = function(req, res) {
  req.checkBody('color', 'Couleur vide').notEmpty();
  req.checkBody('numimmat', 'Immatriculation vide').notEmpty();
  req.checkBody('carId', 'Voiture vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.status(500).json({'errors': errorsFields});
  }

  let carUser = new CarUserModel({
    color: req.body.color,
    numimmat: req.body.numimmat,
    carRef: {
      id_car: req.body.carId
    },
    userRef: {
      id_user: req.session.user.id
    }
  });

  CarsUserService.create(carUser, (err, carUser) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to create car !'}] });
    } else {
      res.json({ 'success': [{msg: 'CarUser Updated !'}], 'carUser': carUser });
    }
  });
} 

/**
 * Update a CarUser
 */
module.exports.update = function(req, res) {
  req.carUser.car.id = req.body.carId;
  req.carUser.color = req.body.color;
  req.carUser.numimmat = req.body.numimmat;

  CarsUserService.update(req.carUser, (err, carUser) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to update carUser !'}] });
    }
    else {
      res.json({ 'success': [{msg: 'carUser Updated !'}], 'carUser': carUser });
    }
  });
}

/**
 * Delete a CarUser
 */
module.exports.delete = function(req, res) {
  CarsUserService.delete(req.carUser.id, (err) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to delete carUser !'}] });
    }
    else {
      res.json({ 'success': [{msg: 'carUser Deleted !'}]});
    }
  });
}

/**
 * Read a CarUser
 */
module.exports.read = function(req, res) {
  res.json(req.carUser);
}

/**
 * List all CarsUser
 */
module.exports.list = function(req, res) {
  CarsUserService.list((err, carsUser) => {
    res.json(carsUser);
  });
}

/**
 * List CarsUser for current user
 */
module.exports.listCurrentUser = function(req, res) {
  CarsUserService.listByUserID(req.session.user.id, (err, carsUser) => {
    res.json(carsUser);
  });
}

/**
 * CarUserByID middleware
 */
exports.carUserByID = function (req, res, next, idCarUser) {
  if (isNaN(idCarUser)) {
    return res.status(400).send({carUser: 'carUser is invalid'});
  }

  CarsUserService.find(idCarUser, (err, carUser) => {
    if (!carUser) {
      return res.status(500).json({ 'errors': [{msg: 'Failed to load carUser ' + idCarUser}] });
    }

    req.carUser = carUser;
  
    next();
  });
}