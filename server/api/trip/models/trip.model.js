let moment = require(__base + 'config/moment')


class Trip {
    constructor(row) {
        this.row = row || {
            id: null,
            canceled: '',
            nb_seats: '',
            hours_departure: '',
            hours_arrival: '',
            pathOSRM: '',
            trip_favorite_id: ''
        };
    }

    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
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

    get trip_favorite_id() {
        return this.row.trip_favorite_id;
    }
    set trip_favorite_id(val) {
        this.row.trip_favorite_id = val;
    }

    toJSON() {
        return {
            id: this.id,
            canceled: this.canceled,
            nb_seats: this.nb_seats,
            hours_departure: this.hours_departure,
            hours_arrival: this.hours_arrival,
            pathOSRM: this.pathOSRM,
            trip_favorite_id: this.trip_favorite_id
        };
    }

    isValid() {
        return true;
    }
}

module.exports = Trip