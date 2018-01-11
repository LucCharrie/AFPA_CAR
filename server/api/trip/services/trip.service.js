//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let TripDAO = require('../dao/trip.dao.mysql');


class TripService {
    static list(term, cb) {
        return TripDAO.list(term, cb);
    }
}

module.exports = TripService;