//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressService = require('../services/address.service');


/**
 * Search of Address
 */
module.exports.search = function(req, res) {
  AddressService.search(req.query.term, (err, addressList) => {
    res.json(addressList);
  });
}