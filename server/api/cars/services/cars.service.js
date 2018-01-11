//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsDAO  = require('../dao/cars.dao.mysql');

class CarsService
{
    static search(term, cb) {
        return CarsDAO.search(term, cb);
    }
}

module.exports = CarsService;