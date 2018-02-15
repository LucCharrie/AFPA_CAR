let Address = require(__base + 'api/address/models/address.model');
let CarUser = require(__base + 'api/cars-user/models/car-user.model');
let User = require(__base + 'api/users/models/user.model');

let AddressUser = require(__base + 'api/addresses-user/models/addresses-user.model');
let TripFavDay = require('./trip_favorite_has_day_week.model')


class TripFavoriteModel 
{
    constructor(row) {
        this.row = row || {
            id_trip_favorite: null,
            name: '',
            nb_seats: '',
            driver: '',
            user_id: '',
            car_user_id: '',
            address_departure_id: '',
            address_arrival_id: '',
            days: '',
            tripFavDayRef:'',
            addressDepRef: '',
            addressArrRef:'',
            carUserRef:'',
            userRef: '',
            vias:''   
        };
        this.row.tripFavDayRef = new TripFavDay(this.row.tripFavDayRef);
        this.row.addressDepRef = new Address(this.row.addressDepRef);
        this.row.addressArrRef = new Address(this.row.addressArrRef);
        this.row.carUserRef = new CarUser(this.row.carUserRef);
        this.row.userRef = new User(this.row.userRef);
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

    get days() {
        return this.row.days;
    }

    set days(val) {
        this.row.days = val;
    }

    get tripFavDayRef(){
        return this.row.tripFavDayRef;
    }

    set tripFavDayRef(val){
        this.row.tripFavDayRef = val;
    }

    get addressDepRef() {
        return this.row.addressDepRef;
    }

    set addressDepRef(val) {
        this.row.addressDepRef = val;
    }

    get addressArrRef() {
        return this.row.addressArrRef;
    }

    set addressArrRef(val) {
        this.row.addressArrRef = val;
    }

    get carUserRef() {
        return this.row.carUserRef;
    }

    set carUserRef(val) {
        this.row.carUserRef = val;
    }

    get vias() {
        return this.row.vias;
    }

    set vias(val) {
        this.row.vias = val;
    }

    get userRef() {
        return this.row.userRef;
    }

    set userRef(val) {
        this.row.userRef = val;
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
            address_arrival_id: this.address_arrival_id,
            days: this.days,
            tripFavDayRef: this.tripFavDayRef,
            addressDepRef: this.addressDepRef,
            addressArrRef: this.addressArrRef,
            carUserRef: this.carUserRef,
            vias: this.vias,
            userRef: this.userRef
        };
    }

    isValid() {
        return true;
    }

}

module.exports = TripFavoriteModel;