let Address = require(__base + 'api/address/models/address.model');
let CarUser = require(__base + 'api/cars-user/models/car-user.model');
let AddressUser = require(__base + 'api/addresses-user/models/addresses-user.model');



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
            days: row.days,
            hours_departure: '', 
            hours_arrival: '', 
            way_type: '',
            addressDepRef: '',
            addressArrRef:'',
            carUserRef:''            
        };
        this.row.addressDepRef = new Address(this.row.addressDepRef);
        this.row.addressArrRef = new Address(this.row.addressArrRef);
        this.row.carUserRef = new CarUser(this.row.carUserRef);
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

    get hours_departure() {
        return this.row.hours_departure;
    }

    set hours_departure(val) {
        this.row.hours_departure = val;
    }

    get hours_arrival() {
        return this.row.hours_arrival;
    }

    set hours_arrival(val) {
        this.row.hours_arrival = val;
    }

    get way_type() {
        return this.row.way_type;
    }

    set way_type(val) {
        this.row.way_type = val;
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
            hours_departure: this.hours_departure, 
            hours_arrival: this.hours_arrival, 
            way_type: this.way_type,
            addressDepRef: this.addressDepRef,
            addressArrRef: this.addressArrRef,
            carUserRef: this.carUserRef
        };
    }

    isValid() {
        return true;
    }

}

module.exports = TripFavoriteModel;