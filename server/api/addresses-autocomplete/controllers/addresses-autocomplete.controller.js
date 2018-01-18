//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressAutoService = require('../services/addresses-autocomplete.service');


/**
 * Search of Address
 */
module.exports.search = function(req, res) {
  AddressAutoService.search(req.query.term, (err, addressList) => {
    res.json(addressList);
  });
}