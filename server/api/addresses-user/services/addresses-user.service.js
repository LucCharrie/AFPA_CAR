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

    static delete(addressUser, cb) {
        return AddressesUserDAO.delete(addressUser, (err) => {
            // console.log(699);
            if (err) {
                console.error(err);
            }
            cb(err);
        });
    }    


    static create(addressUser, idAuto, cb) {
        
        return AddressesUserDAO.create(addressUser, idAuto, (err, addressUserReturned) => {
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }

    // static update(addressUser, idAuto, cb) {
        
    //     return AddressesUserDAO.update(addressUser, idAuto, (err, addressUserReturned) => {
    //         if (err) {
    //             console.error(err);
    //         }

    //         cb(err, addressUserReturned);
    //     });
    // }

    static createGPS(addressUser, cb) {
        return AddressesUserDAO.createGPS(addressUser, (err, addressUserReturned) => {//createGPS dans DAO
            if (err) {
                console.error(err);
            }

            cb(err, addressUserReturned);
        });
    }

}

module.exports = AddressesUserService;