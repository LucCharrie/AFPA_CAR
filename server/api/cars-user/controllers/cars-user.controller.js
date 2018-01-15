//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let CarsUsersService = require('../services/cars-user.service');
let CarUserModel = require('../models/car-user.model');


/**
 * Read a car
 */
module.exports.read = function(req, res) {
  CarsUsersService.find(req.params.idCar, (err, car) => { // à voir pour utiliser le middleware carByID
    res.json(car);
  });
}


/**
 * User middleware
 */
exports.carByID = function (req, res, next, idUser) {
  if (isNaN(idUser)) {
    return res.status(400).send({
      car: 'User is invalid'
    });
  }

  CarsUsersService.find(idUser, (err, car) => {
    if (!car) {
      return next(new Error('Failed to load car ' + idUser));
    }

    req.car = car;
    next();
  });
}