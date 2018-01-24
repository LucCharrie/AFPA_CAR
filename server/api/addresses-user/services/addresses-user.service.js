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

    static create(AddressUserModel, cb) {
        
        return AddressesUserDAO.create(AddressUserModel, cb);
    }

    static createGPS(AddressUserModel, address, cb) {
        return AddressesUserDAO.create(AddressUserModel, cb);//createGPS dans DAO
    }


}

module.exports = AddressesUserService;