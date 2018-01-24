let db = require(__base + 'config/db');
let TripFavoriteModel = require('../models/trip_favorite.model');

class TripFavoriteDAO {

    static list(cb) {

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
        // console.log(trip);


        db.query('INSERT INTO trip_favorite SET name = ?, nb_seats = ?, driver = ?, user_id = ?, car_user_id = ?, address_departure_id = ?, address_arrival_id = ?',
            [trip.name, trip.nb_seats, trip.driver, trip.user_id, trip.car_user_id, trip.address_departure_id, trip.address_arrival_id],
            (err) => {
                //console.log( err )
                cb(err);
            });

        //db.query('CALL _PS_tripFromFavorite (?, ?)', [trip.id_trip_favorite, 3], (err)=>{
        //    cb(err);
        //});   
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

    static findByUserID(id, cb) {

        db.query(`
        
        ######################################
        ## List of trip_favorite by user_id ##
        ######################################
        
        SELECT id_trip_favorite, name, nb_seats, driver,
        
        # select adresses
        dep.street, dep.city, dep.zip_code, dep.numero, dep.latitude, dep.longitude, 
        arr.street, arr.city, arr.zip_code, arr.numero, arr.latitude, arr.longitude,
        
        # select heures
        hours_departure, hours_arrival, way_type,
        
        # select jours
        GROUP_CONCAT(day),
        
        # select voiture
        numimmat, color, model_name, brand_name      
        
        # adresses
        FROM trip_favorite AS tf
        LEFT JOIN address AS dep
        ON tf.address_departure_id = dep.id_address
        LEFT JOIN address AS arr
        ON tf.address_arrival_id = arr.id_address
        
        # heures
        LEFT JOIN trip_favorite_has_day_week AS tfweek
        ON tf.id_trip_favorite = tfweek.trip_favorite_id
        
        # jours
        LEFT JOIN day_week AS dweek
        ON tfweek.day_week_id = dweek.id_day_week
        
        # voiture
        LEFT JOIN car_user
        ON tf.car_user_id = car_user.id_car_user
        LEFT JOIN car
        ON car_user.car_id = car.id_car
        LEFT JOIN car_brand
        ON car.car_brand_id = car_brand.id_car_brand
        
        # Sort the List
        # '1' in dev, '?' in prod
        WHERE tf.user_id = 1
        GROUP BY id_trip_favorite
        
        `, [id], (err, rows) => {
                if (rows[0]) {
                    rows = rows.map((row) => {
                        //return  new TripFavoriteModel(row);
                        return row;
                    });
                    cb(err, rows);
                }
                else {
                    cb(err, null);
                }
            });
    }
}

module.exports = TripFavoriteDAO;