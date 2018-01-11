//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')
let AddressModel = require('../models/address.model');


class AddressDAO
{
    static list(term, cb) {
        db.query(`SELECT numero, street, zip_code, city, latitude, longitude
                    FROM address
                    WHERE CONCAT(numero, ' ', street, ' ', zip_code, ' ', city) LIKE '%` + term + `%' LIMIT 10;`, (err, rows) => {
            rows = rows || [];

            rows = rows.map((row) => {
                return new AddressModel(row)
            });

            cb(err, rows);
        });
    }
}

module.exports = AddressDAO;
