//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let CarsBrandsService = require('../services/cars-brands.service');

// Read a brand
module.exports.read = function(req, res) {
  CarsBrandsService.find(req.params.idCar, (err, car) => {
    res.json(car);
  });
}

//List of Cars Brands
module.exports.list = function(req, res) {
  CarsBrandsService.list((err, cars) => {
      res.json(cars);
    });
}
