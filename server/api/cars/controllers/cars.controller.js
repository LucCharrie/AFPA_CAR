//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let CarsService = require('../services/cars.service');
//let CarModel = require('../models/car.model');


/**
 * Read a car
 */
// module.exports.read = function(req, res) {
//   CarsService.find(req.params.idCar, (err, car) => { // à voir pour utiliser le middleware carByID
//     res.json(car);
//   });
// }


/**
 * List of Cars
 */
module.exports.search = function(req, res) {
    CarsService.search(req.query.term.id, (err, cars) => {
      res.json(cars);
    });
}