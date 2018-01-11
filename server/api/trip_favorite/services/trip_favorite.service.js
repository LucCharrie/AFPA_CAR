let TripFavoriteDAO = require('../dao/trip_favorite.dao.mysql')

class TripFavoriteService {

    static list(cb) {
        return TripFavoriteDAO.list(cb);
    }

    static create(args, cb) {
        return TripFavoriteDAO.create(args, cb);
    }

    static delete(args, cb) {
        return TripFavoriteDAO.delete(args, cb);
    }

}

module.exports = TripFavoriteService;