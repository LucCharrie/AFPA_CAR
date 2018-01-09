//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsDAO  = require('../dao/cars.dao.mysql');

class CarsService
{
    static list(cb) {
        return CarsDAO.list(cb);
    }
}

module.exports = CarsService;