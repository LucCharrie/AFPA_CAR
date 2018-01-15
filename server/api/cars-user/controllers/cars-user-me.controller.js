let CarsUserService = require('../services/cars-user.service');
let CarUserModel = require('../models/car-user.model');

/**
 * Create a Car of current user
 */
module.exports.create = function(req, res) {
  req.checkBody('color', 'Couleur vide').notEmpty();
  req.checkBody('numimmat', 'Immatriculation vide').notEmpty();
  req.checkBody('carId', 'Voiture vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.status(500).json({'errors': errorsFields});
  }

  let carUserModel = new CarUserModel({
    color: req.body.color,
    numimmat: req.body.numimmat,
    carRef: {
      id_car: req.body.carId
    },
    userRef: {
      id_user: req.session.user.id
    }
  });

  CarsUserService.create(carUserModel, (err, carUser) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to create car !'}] });
    } else {
      res.json({ 'success': [{msg: 'carUser Updated !'}], 'carUser': carUser });
    }
  });
}

/**
 * List of Cars's current user
 */
module.exports.list = function(req, res) {
  CarsUserService.listByUserID(req.session.user.id, (err, carsUser) => {
    res.json(carsUser);
  });
}