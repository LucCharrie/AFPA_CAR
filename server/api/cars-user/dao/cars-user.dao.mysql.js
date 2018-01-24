//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db');
let CarUserModel = require('../models/car-user.model');

class CarsUserDAO {
    static create(carUser, cb) {
        console.log(carUser.car);
        db.query('INSERT INTO car_user SET color = ?, numimmat = ?, car_id = ?, user_id = ?', 
        [carUser.color, carUser.numimmat, carUser.car.id, carUser.user.id], (err, result) => {
            return (err) ? cb(err) : CarsUserDAO.find(result.insertId, cb);
        });
    }

    static update(carUser, cb) {
        db.query('UPDATE car_user SET color = ?, numimmat = ?, car_id = ? WHERE id_car_user = ?',
        [carUser.color, carUser.numimmat, carUser.car.id, carUser.id], (err) => {
            return (err) ? cb(err) : CarsUserDAO.find(carUser.id, cb);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM car_user WHERE id_car_user = ?', [id], (err) => {
            return cb(err);
        });
    }

    static find(id, cb) {
        db.query(`SELECT cu.id_car_user,
                         cu.color,
                         cu.numimmat,
                         c.id_car,
                         c.model_name,
                         cb.brand_name,
                         u.id_user
                FROM car_user AS cu
                LEFT JOIN car AS c ON c.id_car = cu.car_id
                LEFT JOIN car_brand AS cb ON cb.id_car_brand = c.car_brand_id
                LEFT JOIN user AS u ON u.id_user = cu.user_id
                WHERE cu.id_car_user = ? LIMIT 1`, [id], (err, rows) => {
            let row = rows[0];

            if (row) {
                let carUserModel = new CarUserModel({
                    id_car_user: row.id_car_user,
                    color: row.color,
                    numimmat: row.numimmat,
                    carRef: {
                        id_car: row.id_car,
                        model_name: row.model_name,
                        brandRef: {
                            brand_name: row.brand_name
                        }
                    },
                    userRef: {
                        id_user: row.id_user
                    }
                });
    
                cb(err, carUserModel);
            }
            else {
                cb(err);
            }
        });
    }

    static list(cb) {
        db.query(`SELECT cu.id_car_user,
                         cu.color,
                         cu.numimmat,
                         c.id_car,
                         c.model_name,
                         cb.brand_name,
                         u.id_user
                FROM car_user AS cu
                LEFT JOIN car AS c ON c.id_car = cu.car_id
                LEFT JOIN car_brand AS cb ON cb.id_car_brand = c.car_brand_id
                LEFT JOIN user AS u ON u.id_user = cu.user_id;`, (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarUserModel({
                    id_car_user: row.id_car_user,
                    color: row.color,
                    numimmat: row.numimmat,
                    carRef: {
                        id: row.id_car,
                        model_name: row.model_name,
                        brandRef: {
                            brand_name: row.brand_name
                        }
                    },
                    userRef : {
                        id_user: row.id_user
                    }
                });
            }));
        });
    }

    static listByUserID(idUser, cb) {
        db.query(`SELECT cu.id_car_user,
                         cu.color,
                         cu.numimmat,
                         c.id_car,
                         c.model_name,
                         cb.brand_name,
                         u.id_user
                FROM car_user AS cu
                LEFT JOIN car AS c ON c.id_car = cu.car_id
                LEFT JOIN car_brand AS cb ON cb.id_car_brand = c.car_brand_id
                LEFT JOIN user AS u ON u.id_user = cu.user_id
                WHERE u.id_user = ` + idUser + `;`, (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarUserModel({
                    id_car_user: row.id_car_user,
                    color: row.color,
                    numimmat: row.numimmat,
                    carRef: {
                        id: row.id_car,
                        model_name: row.model_name,
                        brandRef: {
                            brand_name: row.brand_name
                        }
                    },
                    userRef : {
                        id_user: row.id_user
                    }
                });
            }));
        });
    }
}

module.exports = CarsUserDAO;