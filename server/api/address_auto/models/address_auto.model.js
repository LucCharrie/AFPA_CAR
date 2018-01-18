let moment = require(__base + 'config/moment')


class AddressAutoModel
{
    constructor (row) {
        this.row = row || {
            id: null,
            street: '',
            city: '',
            latitude: '',
            longitude: '',
            numero: '',
            zip_code: '',
            rep: ''
        };
    }

    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }

    get street() {
        return this.row.street;
    }
    set street(val) {
        this.row.street = val;
    }

    get city() {
        return this.row.city;
    }
    set city(val) {
        this.row.city = val;
    }

    get latitude() {
        return this.row.latitude;
    }
    set latitude(val) {
        this.row.latitude = val;
    }

    get longitude() {
        return this.row.longitude;
    }
    set longitude(val) {
        this.row.longitude = val;
    }

    get zip_code() {
        return this.row.zip_code;
    }
    set zip_code(val) {
        this.row.zip_code = val;
    }
    
    get numero() {
        return this.row.numero;
    }
    set numero(val) {
        this.row.numero = val;
    }

    get rep() {
        return this.row.rep;
    }
    set rep(val) {
        this.row.rep = val;
    }

    toJSON() {
        return {
            id: this.id,
            street: this.street,
            city: this.city,
            latitude: this.latitude,
            longitude: this.longitude,
            zip_code: this.zip_code,
            numero: this.numero,
            rep: this.rep
        };
    }

    isValid() {
        return true;
    }
}

module.exports = AddressModel
