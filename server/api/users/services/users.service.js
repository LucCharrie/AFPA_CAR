//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

let UsersDAO  = require('../dao/users.dao.mysql');


class UsersService
{
    static create(user, cb) {
        UsersDAO.create(user, cb);
    }

    static update(user, cb) {
        UsersDAO.update(user, cb);
    }

    static delete(id, cb) {
        return UsersDAO.delete(id, cb);
    }

    static findById(id, cb) {
        return UsersDAO.findById(id, cb);
    }

    static findByEmail(email, cb) {
        return UsersDAO.findByEmail(email, cb);
    }

    static list(cb) {
        return UsersDAO.list(cb);
    }
}

module.exports = UsersService;