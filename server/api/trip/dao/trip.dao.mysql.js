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

    static list(idUser, cb) {
        let query = `
        SELECT 

        trip.id_trip, trip.canceled, trip.nb_seats, trip.hours_departure, trip.hours_arrival,
        
        tf.id_trip_favorite, tf.name,  tf.driver,
        
        dep.street AS depStr, dep.city AS depCity, dep.zip_code AS depZip, dep.numero AS depNum, dep.latitude AS depLat, dep.longitude AS depLng, dep.rep AS depRep, 
        arr.street AS arrStr, arr.city AS arrCity, arr.zip_code AS arrZip, arr.numero AS arrNum, arr.latitude AS arrLat, arr.longitude AS arrLng, arr.rep AS arrRep,
    
        user.login,

        numimmat, color, model_name, brand_name 
        
        FROM trip
        LEFT JOIN trip_favorite AS tf
        ON trip.trip_favorite_id = tf.id_trip_favorite
        
        LEFT JOIN address AS dep
        ON tf.address_departure_id = dep.id_address
        LEFT JOIN address AS arr
        ON tf.address_arrival_id = arr.id_address

        LEFT JOIN user
        ON tf.user_id = user.id_user

        LEFT JOIN car_user
        ON tf.car_user_id = car_user.id_car_user
        LEFT JOIN car
        ON car_user.car_id = car.id_car
        LEFT JOIN car_brand
        ON car.car_brand_id = car_brand.id_car_brand
        
        WHERE tf.user_id = ?
        ORDER BY trip.hours_departure`;

        db.query(query, [idUser], (err, rows) => {
            rows = rows || [];
            rows = rows.map((row) => { return new TripModel(row) });
            cb(err, rows);
        });
    }

    static delete(id, cb) {
        console.log(id);
        db.query('DELETE FROM trip WHERE trip.id_trip = ?', [id], (err) => {
            cb(err);
        });
    }

    static update(trip, cb){
        console.log(trip);

        let query = `UPDATE trip 
                    SET nb_seats = ?, hours_departure = ?, hours_arrival = ?  
                    WHERE id_trip = ? `;

        db.query(query, [], (err)=>{
            
        });
    }

    static findByID(id, cb) {
        let query = `
        SELECT 

        trip.id_trip, trip.canceled, trip.nb_seats, trip.hours_departure, trip.hours_arrival,
        
        tf.id_trip_favorite, tf.name,  tf.driver, tf.user_id,
        
        dep.street AS depStr, dep.city AS depCity, dep.zip_code AS depZip, dep.numero AS depNum, dep.latitude AS depLat, dep.longitude AS depLng, dep.rep AS depRep, 
        arr.street AS arrStr, arr.city AS arrCity, arr.zip_code AS arrZip, arr.numero AS arrNum, arr.latitude AS arrLat, arr.longitude AS arrLng, arr.rep AS arrRep,
    
        user.login,

        numimmat, color, model_name, brand_name 
        
        FROM trip
        LEFT JOIN trip_favorite AS tf
        ON trip.trip_favorite_id = tf.id_trip_favorite
        
        LEFT JOIN address AS dep
        ON tf.address_departure_id = dep.id_address
        LEFT JOIN address AS arr
        ON tf.address_arrival_id = arr.id_address

        LEFT JOIN user
        ON tf.user_id = user.id_user

        LEFT JOIN car_user
        ON tf.car_user_id = car_user.id_car_user
        LEFT JOIN car
        ON car_user.car_id = car.id_car
        LEFT JOIN car_brand
        ON car.car_brand_id = car_brand.id_car_brand
        
        WHERE trip.id_trip = ?`;

        db.query(query, [id], (err, rows) => {
            if (rows[0]) {
                cb(err, new TripModel(rows[0]))
            } else {
                cb(err, null);
            }
        });
    }
}

module.exports = TripDAO;