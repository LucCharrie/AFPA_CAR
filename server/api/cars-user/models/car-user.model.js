class CarUserModel
{
    constructor (row) {
        this.row = row || {
            id_car_user: null,
            car_id: '',
            user_id: '',
            color: '',
            numimmat: ''
        };
    }

    get id() {
        return this.row.id_car_user;
    }
    set id(val) {
        this.row.id_car_user = val;
    }

    get car_id() {
        return this.row.car_id;
    }
    set car_id(val) {
        this.row.car_id = val;
    }

    get user() {
        return this.row.user_id;
    }
    set user(val) {
        this.row.user_id = val;
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
            car_id: this.car_id,
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
