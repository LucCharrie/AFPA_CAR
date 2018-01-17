//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressesUsersService = require('../services/addresses-user.service');
let AddressesUserModel = require('../models/addresses-user.model');


/**
 * Read an address
 */
module.exports.read = function(req, res) {
  AddressesUsersService.find(req.params.idAddresses-user, (err, car) => { // à voir pour utiliser le middleware carByID
    res.json(address);
  });
}


/**
 * User middleware
 */
exports.addressesByID = function (req, res, next, idUser) {
  if (isNaN(idUser)) {
    return res.status(400).send({
      address: 'User is invalid'
    });
  }

  AddressesUsersService.find(idUser, (err, car) => {
    if (!car) {
      return next(new Error('Failed to load car ' + idUser));
    }

    req.address = address;
    next();
  });
}