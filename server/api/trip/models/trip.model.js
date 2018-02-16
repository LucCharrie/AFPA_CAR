let moment = require(__base + 'config/moment')
let TripFav = require(__base + 'api/trip_favorite/models/trip_favorite.model');


class Trip {
    constructor(row) {
        this.row = {};

        this.row.id_trip = row.id_trip || null;
        this.row.canceled = row.canceled || null;
        this.row.nb_seats = row.nb_seats || null;
        this.row.hours_departure = row.hours_departure || null;
        this.row.hours_arrival = row.hours_arrival || null;

        if (!Number.isInteger(this.row.tripFavRef)) {
            this.row.tripFavRef = new TripFav({
                id_trip_favorite: row.id_trip_favorite,
                name: row.name,
                driver: row.driver,
                user_id: row.user_id,

                addressDepRef: {
                    street: row.depStr,
                    city: row.depCity,
                    zip_code: row.depZip,
                    numero: row.depNum,
                    latitude: row.depLat,
                    longitude: row.depLng,
                    rep: row.depRep
                },

                addressArrRef: {
                    street: row.arrStr,
                    city: row.arrCity,
                    zip_code: row.arrZip,
                    numero: row.arrNum,
                    latitude: row.arrLat,
                    longitude: row.arrLng,
                    rep: row.arrRep
                },

                carUserRef: {
                    color: row.color,
                    numimmat: row.numimmat,
                    carRef: {
                        model_name: row.model_name,
                        brandRef: {
                            brand_name: row.brand_name
                        }
                    }
                },

                userRef: {
                    login: row.login
                }
            });
        }


    }

    get id_trip() {
        return this.row.id_trip;
    }
    set id_trip(val) {
        this.row.id_trip = val;
    }

    get canceled() {
        return this.row.canceled;
    }
    set canceled(val) {
        this.row.canceled = val;
    }

    get nb_seats() {
        return this.row.nb_seats;
    }
    set nb_seats(val) {
        this.row.nb_seats = val;
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

    get pathOSRM() {
        return this.row.pathOSRM;
    }
    set pathOSRM(val) {
        this.row.pathOSRM = val;
    }

    get tripFavRef() {
        return this.row.tripFavRef;
    }
    set tripFavRef(val) {
        this.row.tripFavRef = val;
    }

    toJSON() {
        return {
            id_trip: this.id_trip,
            canceled: this.canceled,
            nb_seats: this.nb_seats,
            hours_departure: this.hours_departure,
            hours_arrival: this.hours_arrival,
            pathOSRM: this.pathOSRM,
            tripFavRef: this.tripFavRef
        };
    }

    isValid() {
        return true;
    }
}

module.exports = Trip


// this.row = {
//     id_trip: row.id_trip,
//     canceled: row.canceled,
//     nb_seats: row.nb_seats,
//     hours_departure: row.hours_departure,
//     hours_arrival: row.hours_arrival,

//     tripFavRef: new TripFav({
//         id_trip_favorite: row.id_trip_favorite,
//         name: row.name,
//         driver: row.driver,

//         addressDepRef: {
//             street: row.depStr,
//             city: row.depCity,
//             zip_code: row.depZip,
//             numero: row.depNum,
//             latitude: row.depLat,
//             longitude: row.depLng,
//             rep: row.depRep
//         },

//         addressArrRef: {
//             street: row.arrStr,
//             city: row.arrCity,
//             zip_code: row.arrZip,
//             numero: row.arrNum,
//             latitude: row.arrLat,
//             longitude: row.arrLng,
//             rep: row.arrRep
//         },

//         carUserRef: {
//             color: row.color,
//             numimmat: row.numimmat,
//             carRef: {
//                 model_name: row.model_name,
//                 brandRef: {
//                     brand_name: row.brand_name
//                 }
//             }
//         },

//         userRef: {
//             login: row.login
//         }
//     })
// };