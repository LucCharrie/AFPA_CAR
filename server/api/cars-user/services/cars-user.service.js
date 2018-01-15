//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsUserDAO  = require('../dao/cars-user.dao.mysql');

class CarsUserService
{
    static listByUserID(id, cb) {
        return CarsUserDAO.listByUserID(id, cb);
    }

    static create(CarUserModel, cb) {
        return CarsUserDAO.create(CarUserModel, cb);
    }
}

module.exports = CarsUserService;