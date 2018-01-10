let moment = require(__base + 'config/moment')


class UserModel
{
    constructor (row) {
        this.row = row || {
            id_user: null,
            login: '',
            email: '',
            password: '',
            num_afpa: '',
            firstname: '',
            lastname: '',
            gender: '',
            birthday: '',
            created_at: '',
            roles: [],
            formation_id: '',
            mobile_phone: ''
        };
    }

    get id() {
        return this.row.id_user;
    }
    set id(val) {
        this.row.id_user = val;
    }

    get login() {
        return this.row.login;
    }
    set login(val) {
        this.row.login = val;
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

    get numafpa() {
        return this.row.num_afpa;
    }
    set numafpa(val) {
        this.row.num_afpa = val;
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

    get gender() {
        return this.row.gender;
    }
    set gender(val) {
        this.row.gender = val;
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

    get formation() {
        return this.row.formation_id;
    }
    set formation(val) {
        this.row.formation_id = val;
    }

    get mobile_phone() {
        return this.row.mobile_phone;
    }
    set mobile_phone(val) {
        this.row.mobile_phone = val;
    }

    toJSON() {
        return {
            id: this.id,
            login: this.login,
            email: this.email,
            numafpa: this.numafpa,
            firstname: this.firstname,
            lastname: this.lastname,
            gender: this.gender,
            birthday: this.birthday,
            created_at: this.create_at,
            roles: this.roles,
            formation: this.formation,
            mobile_phone: this.mobile_phone
        };
    }

    isValid() {
        return !(
            this.firstname === '' ||
            this.firstname === undefined ||
            this.lastname === '' ||
            this.lastname === undefined);
    }
}

module.exports = UserModel
