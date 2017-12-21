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
    static list(filter, cb) {
        db.query(`SELECT num, name, postcode, city
                    FROM address
                    WHERE CONCAT(\`num\`, ' ', \`name\`, ' ', \`postcode\`, ' ', \`city\`) LIKE '%` + filter + `%' ;`, (err, rows) => {
            rows = rows || [];

            rows = rows.map((row) => {
                return new AddressModel(row)
            });

            cb(err, rows);
        });
    }
}

module.exports = AddressDAO;
