let moment = require(__base + 'config/moment')


class UserModel
{
    constructor (row) {
        this.row = row || {
            id: null,
            name: '',
            num: '',
            city: '',
            latitude: '',
            longitude: '',
            postcode: ''
        };
    }

    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }

    get name() {
        return this.row.name;
    }
    set name(val) {
        this.row.name = val;
    }

    get num() {
        return this.row.num;
    }
    set num(val) {
        this.row.num = val;
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

    get postcode() {
        return this.row.postcode;
    }
    set postcode(val) {
        this.row.postcode = val;
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            num: this.num,
            city: this.city,
            latitude: this.latitude,
            longitude: this.longitude,
            postcode: this.postcode
        };
    }

    isValid() {
        return true;
    }
}

module.exports = UserModel
