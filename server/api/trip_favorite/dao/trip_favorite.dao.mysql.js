let db = require(__base + 'config/db');
let TripFavoriteModel = require('../models/trip_favorite.model');

class TripFavoriteDAO {


    static list(cb) {
        // db.query('SELECT * FROM trip_favorite',
        //     (err, rows) => {
        //         rows = rows || [];

        //         rows = rows.map((row) => {
        //             return new TripFavoriteModel(row);
        //         });

        //         cb(err, rows);
        //     });

        db.query(`SELECT tf.id_trip_favorite, 
		                tf.name, 
                        tf.nb_seats,
                        tf.driver,
                        tf.user_id,
                        tf.car_user_id,
                        tf.address_departure_id,
                        tf.address_arrival_id
                        FROM trip_favorite AS tf`, (err, rows) => {
                rows = rows || [];

                rows = rows.map((row) => {
                    return new TripFavoriteModel(row);
                });

                cb(err, rows);
            });
    }


    static create(trip, cb) {
        db.query('INSERT INTO trip_favorite SET name = ?, nb_seats = ?, driver = ?, car_user_id = ?, address_departure_id = ?, address_arrival_id = ?',
            [trip.name, trip.nb_seats, trip.driver, trip.car_user_id, trip.address_departure_id, trip.address_arrival_id],
            (err) => {
                cb(err);
            });
    }

    static delete(trip, cb) {
        db.query('DELETE FROM trip_favorite WHERE id_trip_favorite = ?', [trip.id_trip_favorite],
            (err) => {
                cb(err);
            });

    }

    static findByID(id, cb) {

        db.query('SELECT * FROM trip_favorite WHERE id_trip_favorite = ? LIMIT 1', [id], (err, rows) => {
            if (rows[0]) {
                cb(err, new TripFavoriteModel(rows[0]))
            }
            else {
                cb(err, null);
            }
        });
    }

}

module.exports = TripFavoriteDAO;