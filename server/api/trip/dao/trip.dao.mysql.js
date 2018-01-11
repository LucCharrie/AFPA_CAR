//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')

let TripModel = require('../models/trip.model');
let TripFavoriteModel = require(__base + 'api/trip_favorite/models/trip_favorite.model');


class TripDAO {

    static list(cb) {
        db.query(`SELECT trip.canceled, 
		                trip.nb_seats, 
                        trip.hours_departure,
                        trip.hours_arrival,
                        trip.pathOSRM,
                        trip.favorite_id
                        FROM trip`, (err, rows) => {
            rows = rows || [];

            rows = rows.map((row) => {
                return new TripModel(row);
            });

            cb(err, rows);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM trip WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }

    static findByID(id, cb) {
        db.query('SELECT * FROM trip WHERE id_trip = ? LIMIT 1', [id], (err, rows) => {
            if (rows[0]) {
                cb(err, new TripFavoriteModel(rows[0]))
            } else {
                cb(err, null);
            }
        });
    }

}

module.exports = TripDAO;