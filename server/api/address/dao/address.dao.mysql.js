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
    static search(term, cb) {
        let splitted = term.split(' ');
        let where_clause = '';

        for (let i = 0; i < splitted.length; i++)
        {
            where_clause += `CONCAT(numero, ' ', street, ' ', zip_code, ' ', city) LIKE '%` + splitted[i] + `%'`;

            if (i < splitted.length - 1)
            {
                where_clause += ' AND ';
            }
        }

        db.query(`SELECT numero, street, zip_code, city, latitude, longitude
                    FROM address
                    WHERE ` + where_clause + ` LIMIT 10;`, (err, rows) => {
            rows = rows || [];

            rows = rows.map((row) => {
                return new AddressModel(row)
            });

            cb(err, rows);
        });
    }
}

module.exports = AddressDAO;