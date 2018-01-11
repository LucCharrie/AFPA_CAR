//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressService = require('../services/trip.service');


/**
 * List of Address
 */
module.exports.list = function(req, res) {
    TripService.list(req.query.term, (err, tripList) => {
        res.json(tripList);
    });
}