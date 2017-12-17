let moment = require(__base + 'config/moment')


class UserModel
{
    constructor (row) {
        this.row = row || {
            id: null,
            username: '',
            email: '',
            password: '',
            idafpa: '',
            firstname: '',
            lastname: '',
            sex: '',
            birthday: '',
            created_at: '',
            roles: []
        };
    }

    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }

    get username() {
        return this.row.username;
    }
    set username(val) {
        this.row.username = val;
    }

    get email() {
        return this.row.email;
    }
    set email(val) {
        this.row.email = val;
    }

    get password() {
        return this.row.password;
    }
    set password(val) {
        this.row.password = val;
    }

    get idafpa() {
        return this.row.idafpa;
    }
    set idafpa(val) {
        this.row.idafpa = val;
    }

    get firstname() {
        return this.row.firstname;
    }
    set firstname(val) {
        this.row.firstname = val;
    }

    get lastname() {
        return this.row.lastname;
    }
    set lastname(val) {
        this.row.lastname = val;
    }

    get sex() {
        return this.row.sex;
    }
    set sex(val) {
        this.row.sex = val;
    }

    get birthday() {
      return this.row.birthday;
    }
    set birthday(val) {
        this.row.birthday = val;
    }

    get created_at() {
        return moment(this.row.created_at);
    }
    set created_at(val) {
        this.row.created_at = val;
    }

    get roles() {
      return this.row.roles;
    }
    set roles(val) {
        this.row.roles = val;
    }
    
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            idafpa: this.idafpa,
            firstname: this.firstname,
            lastname: this.lastname,
            sex: this.sex,
            birthday: this.birthday,
            created_at: this.create_at,
            roles: this.roles
        };
    }

    isValid() {
        return !(isNaN(this.age) ||
            this.firstname === '' ||
            this.firstname === undefined ||
            this.lastname === '' ||
            this.lastname === undefined);
    }
}

module.exports = UserModel
