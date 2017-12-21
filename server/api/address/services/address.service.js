//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressDAO  = require('../dao/address.dao.mysql');


class AddressService
{
    static list(filter, cb) {
        return AddressDAO.list(filter, cb);
    }
}

module.exports = AddressService;