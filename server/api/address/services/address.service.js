//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressDAO  = require('../dao/address.dao.mysql');


class AddressService
{
    static list(term, cb) {
        return AddressDAO.list(term, cb);
    }
}

module.exports = AddressService;