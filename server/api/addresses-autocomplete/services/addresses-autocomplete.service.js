//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let AddressAutoDAO  = require('../dao/addresses-autocomplete.dao.mysql');


class AddressAutoService
{
    static search(term, cb) {
        return AddressAutoDAO.search(term, cb);
    }
}

module.exports = AddressAutoService;