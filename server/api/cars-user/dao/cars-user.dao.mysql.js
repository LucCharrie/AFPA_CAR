//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')

let CarModel = require('../models/car.model');
let UserModel = require(__base + 'api/users/models/user.model');


class CarsDAO {
    static create(car, cb) {
        db.query('INSERT INTO car SET title = ?, text = ?, author_id = ?, created_at = ?', [car.title, car.text, car.author.id, new Date()], (err, result) => {
            CarsDAO.find(result.insertId, cb);
        });
    }

    static update(car, cb) {
        db.query('UPDATE car SET title = ?, text = ?, author_id = ? WHERE id = ?', [car.title, car.text, car.author.id, car.id], (err) => {
            CarsDAO.find(car.id, cb);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM car WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }

    static list(cb) {
        db.query(`SELECT m.id,
                         m.title,
                         m.text,
                         m.created_at,
                         u.id as author_id,
                         u.firstname as author_firstname,
                         u.lastname as author_lastname,
                         u.age as author_age
                FROM car AS m INNER JOIN user AS u
                ON m.author_id = u.id`, (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarModel({
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
            }));
        });
    }

    static listByAuthorId(id, cb) {
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
                WHERE m.author_id = ?`, [id], (err, rows) => {
            rows = rows || [];

            cb(err, rows.map((row) => {
                return new CarModel({
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