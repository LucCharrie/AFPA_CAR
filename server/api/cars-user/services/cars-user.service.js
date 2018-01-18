//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsUserDAO  = require('../dao/cars-user.dao.mysql');

class CarsUserService
{
    static create(carUser, cb) {
        return CarsUserDAO.create(carUser, cb);
    }

    static update(carUser, cb) {
        return CarsUserDAO.update(carUser, cb);
    }

    static delete(id, cb) {
        return CarsUserDAO.delete(id, cb);
    }

    static find(id, cb) {
        return CarsUserDAO.find(id, cb);
    }

    static list(cb) {
        return CarsUserDAO.list(cb);
    }

    static listByUserID(idUser, cb) {
        return CarsUserDAO.listByUserID(idUser, cb);
    }
}

module.exports = CarsUserService;