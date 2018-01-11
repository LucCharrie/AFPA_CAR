//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')
let CarModel = require('../models/car.model');

class CarsDAO
{
    static list(term, cb) {
        db.query(`SELECT c.id_car, c.model_name, cb.brand_name
                    FROM car AS c
                    LEFT JOIN car_brand AS cb on c.car_brand_id = cb.id_car_brand
                    WHERE CONCAT(\`c.id_car\`, ' ', \`c.model_name\`, ' ', \`cb.brand_name\`) LIKE '%` + term + `%' LIMIT 10;`, (err, rows) => {
            rows = rows || [];
             rows = rows.map((row) => {
                return new CarModel({
                    id_car: row.id_car,
                    model_name: row.model_name,
                    brand: {
                        brand_name: row.brand_name
                    }
                });
            });

            cb(err, rows);
        });
    }
}

module.exports = CarsDAO;
