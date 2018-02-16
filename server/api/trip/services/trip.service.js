//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let TripDAO = require('../dao/trip.dao.mysql');


class TripService {
    static list(arg, cb) {
        return TripDAO.list(arg, cb);
    }

    static delete(args, cb) {
        return TripDAO.delete(args, cb);
    }

    static update(args, cb) {
        return TripDAO.update(args, cb);
    }

    static findByID(id, cb) {
        return TripDAO.findByID(id, cb);
    }
}

module.exports = TripService;