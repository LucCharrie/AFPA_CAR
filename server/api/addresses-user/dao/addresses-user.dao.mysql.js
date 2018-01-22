//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')

let AddressesUserModel = require('../models/addresses-user.model');

class AddressesUserDAO {
    static create(AddressesUserModel, cb) {
        console.log(19);
        // db.query('INSERT INTO car_user SET color = ?, numimmat = ?, car_id = ?, user_id = ?', 
        // [CarUserModel.color, CarUserModel.numimmat, CarUserModel.car.id, CarUserModel.user.id], (err, result) => {
        //     console.log(err);
        //     //CarsUserDAO.find(result.insertId, cb);
        // });
    }

    // static update(car, cb) {
    //     db.query('UPDATE car SET title = ?, text = ?, author_id = ? WHERE id = ?', [car.title, car.text, car.author.id, car.id], (err) => {
    //         CarsDAO.find(car.id, cb);
    //     });
    // }

    static delete(id, cb) {
        db.query('DELETE FROM car_user WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }

    static deleteByUserID(id, idUser, cb) {
        db.query('DELETE FROM car_user WHERE id_car_user = ? AND user_id = ?', [id, idUser], (err) => {
            cb(err);
        });
    }

    static listByUserID(idUser, cb) {
        db.query(`SELECT ua.user_id,
                    ua.address_id,
                    ua.date_suppression,
                    ua.libelle,
                    a.street,
                    a.city,
                    a.latitude,
                    a.longitude,
                    a.zip_code,
                    a.numero,
                    a.rep
                FROM user_address AS ua
                LEFT JOIN address AS a ON a.id_address = ua.address_id
                WHERE ua.date_suppression IS NULL AND 
                ua.user_id = ` + idUser + `;`, (err, rows) => {
            rows = rows || [];
            console.log(rows);
            console.log( '##' + rows[0].libelle )
            cb(err, rows.map((row) => {
                return new AddressesUserModel({
                    // userRef : {
                    //     id_user: row.user_id
                    // },

                    // addressRef: {
                    //     street: row.street,
                    //     city: row.city,
                    //     latitude: row.latitude,
                    //     longitude: row.longitude,
                    //     zip_code: row.zip_code,
                    //     numero: row.numero,
                    //     rep: row.rep
                    // },

                    libelle: row.libelle
                    
                });
                console.log (toto.libelle)
            }));
        });
    }

    static find(id, cb) {
        db.query(`SELECT cu.id_car_user,
                         cu.color,
                         cu.numimmat,
                         c.id_car,
                         c.model_name,
                         cb.brand_name
                FROM car_user AS cu
                LEFT JOIN car AS c ON c.id_car = cu.car_id
                LEFT JOIN car_brand AS cb ON cb.id_car_brand = c.car_brand_id
                LEFT JOIN user AS u ON u.id_user = cu.user_id
                WHERE cu.id_car_user = ? LIMIT 1`, [id], (err, rows) => {
            let row = rows[0];

            let carUserModel = new CarUserModel({
                id_car_user: row.id_car_user,
                color: row.color,
                numimmat: row.numimmat,
                carRef: {
                    id: row.id_car,
                    model_name: row.model_name,
                    brandRef: {
                        brand_name: row.brand_name
                    }
                }
            });

            cb(err, carUserModel);
        });
    }
}

module.exports = AddressesUserDAO;