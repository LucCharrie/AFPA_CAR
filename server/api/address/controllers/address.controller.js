//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressService = require('../services/address.service');


/**
 * List of Address
 */
module.exports.list = function(req, res) {
  AddressService.list(req.query.filter, (err, addressList) => {
    res.json(addressList);
  });
}

