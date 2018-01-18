//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let CarsUserDAO  = require('../dao/cars-user.dao.mysql');

class CarsUserService
{
    static create(carUser, cb) {
        return CarsUserDAO.create(carUser, (err, carUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, carUserReturned);
        });
    }

    static update(carUser, cb) {
        return CarsUserDAO.update(carUser, (err, carUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, carUserReturned);
        });
    }

    static delete(id, cb) {
        return CarsUserDAO.delete(id, (err) => {
            if (err) {
                console.error(err);
            }

            cb(err);
        });
    }

    static find(id, cb) {
        return CarsUserDAO.find(id, (err, carUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, carUserReturned);
        });
    }

    static list(cb) {
        return CarsUserDAO.list((err, carsUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, carsUserReturned);
        });
    }

    static listByUserID(idUser, cb) {
        return CarsUserDAO.listByUserID(idUser, (err, carsUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, carsUserReturned);
        });
    }
}

module.exports = CarsUserService;