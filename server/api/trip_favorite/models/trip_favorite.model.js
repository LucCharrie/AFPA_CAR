let Address = require(__base + 'api/address/models/address.model');

let CarBrandModel = require(__base + 'api/cars-brands/models/car-brand.model');
let Car = require(__base + 'api/cars/models/car.model');
let CarModel = require(__base + 'api/cars-user/models/car-user.model');


class TripFavoriteModel {
    constructor(row) {
        this.row = row || {
            id_trip_favorite: null,
            name: '',
            nb_seats: '',
            driver: '',
            user_id: '',
            car_user_id: '',
            address_departure_id: '',
            address_arrival_id: '' 
        }
        this.row.addressDepRef = new Address(this.row.addressDepRef);
        this.row.addressArrRef = new Address(this.row.addressArrRef);
        this.row.brandRef = new CarBrandModel(this.row.brandRef);
        this.row.modelRef = new CarModel(this.row.modelRef);
        this.row.carRef = new Car(this.row.carRef);
    }

    

    get id_trip_favorite() {
        return this.row.id_trip_favorite;
    } 

    set id_trip_favorite(val) {
        this.row.id_trip_favorite = val;
    }

    get name() {
        return this.row.name;
    } 

    set name(val) {
        this.row.name = val;
    }

    get nb_seats() {
        return this.row.nb_seats;
    } 

    set nb_seats(val) {
        this.row.nb_seats = val;
    }

    get driver() {
        return this.row.driver;
    } 

    set driver(val) {
        this.row.driver = val;
    }

    get user_id() {
        return this.row.user_id;
    } 

    set user_id(val) {
        this.row.user_id = val;
    }

    get car_user_id() {
        return this.row.car_user_id;
    } 

    set car_user_id(val) {
        this.row.car_user_id = val;
    }

    get address_departure_id() {
        return this.row.address_departure_id;
    } 

    set address_departure_id(val) {
        this.row.address_departure_id = val;
    }

    get address_arrival_id() {
        return this.row.address_arrival_id;
    } 

    set address_arrival_id(val) {
        this.row.address_arrival_id = val;
    }

    toJSON() {
        return {
            id_trip_favorite: this.id_trip_favorite,
            name: this.name,
            nb_seats: this.nb_seats,
            driver: this.driver,
            user_id: this.user_id,
            car_user_id: this.car_user_id,
            address_departure_id: this.address_departure_id,
            address_arrival_id: this.address_arrival_id
        };
    }

    isValid() {
        return true;
    }

}

module.exports = TripFavoriteModel;