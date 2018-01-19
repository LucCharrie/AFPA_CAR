//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressesUserDAO  = require('../dao/addresses-user.dao.mysql');

class AddressesUserService
{
    static listByUserID(id, cb) {
        return AddressesUserDAO.listByUserID(id, cb);
    }

    static delete(id, cb) {
        return AddressesUserDAO.delete(id, cb);
    }

    static deleteByUserID(id, idUser, cb) {
        return AddressesUserDAO.deleteByUserID(id, idUser, cb);
    }

    static create(AddressUserModel, addressID, cb) {
        console.log(999);
        console.log(addressID);
        console.log(1001);
        return AddressesUserDAO.create(AddressUserModel, cb);
    }
}

module.exports = AddressesUserService;