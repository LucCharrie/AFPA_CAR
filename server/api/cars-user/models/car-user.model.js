let UserModel = require(__base + 'api/users/models/user.model');
let CarModel = require(__base + 'api/cars/models/car.model');

class CarUserModel
{
    constructor (row) {
        this.row = row || {
            id_car_user: null,
            carRef: '',
            userRef: '',
            color: '',
            numimmat: ''
        };

        this.row.carRef = new CarModel(this.row.carRef);
        this.row.userRef = new UserModel(this.row.userRef);
    }

    get id() {
        return this.row.id_car_user;
    }
    set id(val) {
        this.row.id_car_user = val;
    }

    get car() {
        return this.row.carRef;
    }
    set car(val) {
        this.row.carRef = val;
    }

    get user() {
        return this.row.userRef;
    }
    set user(val) {
        this.row.userRef = val;
    }

    get color() {
        return this.row.color;
    }
    set color(val) {
        this.row.color = val;
    }

    get numimmat() {
        return this.row.numimmat;
    }
    set numimmat(val) {
        this.row.numimmat = val;
    }

    toJSON() {
        return {
            id: this.id,
            car: this.car,
            user: this.user,
            color: this.color,
            numimmat: this.numimmat
        };
    }

    isValid() {
        return true;
    }
}

module.exports = CarUserModel
