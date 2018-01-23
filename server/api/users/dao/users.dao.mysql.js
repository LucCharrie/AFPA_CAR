//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require(__base + 'config/db')
let UserModel = require('../models/user.model');


class UsersDAO
{
    static create(user, cb) {
        db.query('INSERT INTO user SET login = ?, email = ?, password = ?, firstname = ?, lastname = ?, created_at = ?', [user.login, user.email, user.password, user.firstname, user.lastname, new Date()], (err, result) => {
            UsersDAO.findById(result.insertId, cb);
        });
    }

    static update(user, cb) {
        db.query('UPDATE user SET firstname = ?, lastname = ?, gender = ?, birthday = ?, mobile_phone = ?, login = ?, email = ?, formation_id = ?  WHERE id_user = ?', [user.firstname, user.lastname, user.gender, user.birthday, user.mobile_phone, user.login, user.email, user.formation, user.id], (err) => {
            cb(err, user);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM user WHERE id_user = ?', [id], (err) => {
            cb(err);
        });
    }

    static list(cb) {
        db.query('SELECT * FROM user', (err, rows) => {
            rows = rows || [];

            rows = rows.map((row) => {
                return new UserModel(row)
            });

            cb(err, rows);
        });
    }

    static findById(id, cb) {
        db.query('SELECT * FROM user WHERE id_user = ? LIMIT 1', [id], (err, rows) => {
            return (rows[0]) ? cb(err, new UserModel(rows[0])) : cb(err, null);
        });
    }

    static findByEmail(email, cb) {
        db.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email], (err, rows) => {
            return (rows[0]) ? cb(err, new UserModel(rows[0])) : cb(err, null);
        });
    }
}

module.exports = UsersDAO;
