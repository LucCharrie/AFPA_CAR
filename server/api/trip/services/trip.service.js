//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let TripDAO = require('../dao/trip.dao.mysql');


class TripService {
    static list(cb) {
        return TripDAO.list(cb);
    }

    static create(args, cb) {
        return TripDAO.create(args, cb);
    }

    static delete(args, cb) {
        return TripDAO.delete(args, cb);
    }

    static findByID(id, cb) {
        return TripDAO.findByID(id, cb);
    }
}

module.exports = TripService;