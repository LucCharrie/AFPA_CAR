//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')

let CarModel = require('../models/car.model');
let UserModel = require(__base + 'api/users/models/user.model');


class CarsBrandDAO
{


    static list(cb) {
        db.query(`SELECT cb.id_car_brand,
                        cb.brand_name
                FROM car_brand AS cb `, (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarModel({
                    id: row.id_car_brand,
                    brand_name: row.brand_name
                });
            }));
        });
    }

    static find(id, cb) {
        db.query(`SELECT cb.id_car_brand,
                        cb.brand_name
                FROM car_brand AS cb 
                WHERE cb.id_car_brand = ? LIMIT 1`, [id], (err, rows) => {
            let row = rows[0];

            let carBrand = new CarBrandModel({
                id: row.id_car_brand,
                brand_name: row.brand_name
            });

            cb(err, car);
        });
    }
}

module.exports = CarsBrandDAO;
