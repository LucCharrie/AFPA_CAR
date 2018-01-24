//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressesUserDAO  = require('../dao/addresses-user.dao.mysql');

class AddressesUserService
{
    static listByUserID(idUser, cb) {
        return AddressesUserDAO.listByUserID(idUser, (err, AddressUserReturned) => {
                        if (err) {
                console.error(err);
            }

            cb(err, AddressUserReturned);
        });
    }

    static delete(id, cb) {
        return AddressesUserDAO.delete(id, (err, carUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, AddressUserReturned);
        });
    }    

    static deleteByUserID(id, idUser, cb) {
        return AddressesUserDAO.deleteByUserID(id, idUser, (err, carUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, AddressUserReturned);
        });
    }

    static create(AddressUser, cb) {
        
        return AddressesUserDAO.create(AddressUser, (err, carUserReturned) => {
            console.log(2);
            if (err) {
                console.log(3);
                console.error(err);
            }

            cb(err, AddressUserReturned);
        });
    }

    static createGPS(AddressUser, cb) {
        return AddressesUserDAO.create(AddressUser, (err, carUserReturned) => {//createGPS dans DAO
            if (err) {
                console.error(err);
            }

            cb(err, AddressUserReturned);
        });
    }


}

module.exports = AddressesUserService;