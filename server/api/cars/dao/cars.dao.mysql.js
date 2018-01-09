//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')

let CarModel = require('../models/car.model');
let CarBrandModel = require(__base + 'api/cars-brands/models/car-brand.model');


class CarsDAO
{
    static list(cb) {
        db.query(`SELECT c.id_car,
                         c.model_name,
                         cb.brand_name as brand_name
                FROM car AS c INNER JOIN car_brand AS cb
                ON c.car_brand_id = cb.id_car_brand`, (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarModel({
                    id_car: row.id_car,
                    model_name: row.model_name,
                    brand: {
                        brand_name: row.brand_name
                    }
                });
            }));
        });
    }

    static find(id, cb) {
        db.query(`SELECT m.id,
                         m.title,
                         m.text,
                         m.created_at,
                         u.id as author_id,
                         u.firstname as author_firstname,
                         u.lastname as author_lastname,
                         u.age as author_age
                FROM car AS m INNER JOIN user AS u
                ON m.author_id = u.id
                WHERE m.id = ? LIMIT 1`, [id], (err, rows) => {
            let row = rows[0];

            let car = new CarModel({
                id: row.id,
                title: row.title,
                text: row.text,
                created_at: row.created_at,
                author: {
                    id: row.author_id,
                    firstname: row.author_firstname,
                    lastname: row.author_lastname,
                    age: row.author_age
                }
            });

            cb(err, car);
        });
    }
}

module.exports = CarsDAO;
