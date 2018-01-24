//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressesUserDAO  = require('../dao/addresses-user.dao.mysql');

class AddressesUserService
{
    static listByUserID(idUser, cb) {
        return AddressesUserDAO.listByUserID(idUser, (err, addressUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }

    static delete(id, cb) {
        return AddressesUserDAO.delete(id, (err, addressUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }    

    static deleteByUserID(id, idUser, cb) {
        return AddressesUserDAO.deleteByUserID(id, idUser, (err, addressUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }

    static create(addressUser, cb) {
        
        return AddressesUserDAO.create(addressUser, (err, addressUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }

    static createGPS(addressUser, cb) {
        return AddressesUserDAO.create(addressUser, (err, addressUserReturned) => {//createGPS dans DAO
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }
}

module.exports = AddressesUserService;