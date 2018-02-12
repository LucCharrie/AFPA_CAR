let TripFavoriteDAO = require('../dao/trip_favorite.dao.mysql')

class TripFavoriteService {

    static findByID(id, cb) {
        return TripFavoriteDAO.findByID(id, cb);
    }

    static list(id, cb) {
        return TripFavoriteDAO.list(id, cb);
    }

    static create(args, cb) {
        return TripFavoriteDAO.create(args, cb);
    }

    static update(args, cb) {
        return TripFavoriteDAO.update(args, cb);
    }

    static delete(args, cb) {
        return TripFavoriteDAO.delete(args, cb);
    }


}

module.exports = TripFavoriteService;