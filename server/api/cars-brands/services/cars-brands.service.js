//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsBrandsDAO  = require('../dao/cars-brands.dao.mysql');

class CarsBrandsService
{
    static list(cb) {
        return CarsBrandsDAO.list(cb);
    }
}

module.exports = CarsBrandsService;