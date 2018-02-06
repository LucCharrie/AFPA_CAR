let day = require('./day_week.model');

class TripFavDay
{
    constructor(row){
       this.row = row || {
           hours_departure: '',
           hours_arrival: '',
           way_type: '',
           trip_favorite_id: '',
           day_week_id: '',
           dayRef: ''
        }
        this.row.dayRef = new day(this.row.dayRef);
    }

    set hours_departure(e){
        this.row.hours_departure = e;
    }
    get hours_departure(){
        return this.row.hours_departure;
    }

    set hours_arrival(e){
        this.row.hours_arrival = e;
    }
    get hours_arrival(){
        return this.row.hours_arrival;
    }

    set way_type(e){
        this.row.way_type = e;
    }
    get way_type(){
        return this.row.way_type;
    }

    set trip_favorite_id(e){
        this.row.trip_favorite_id = e;
    }
    get trip_favorite_id(){
        return this.row.trip_favorite_id;
    }

    set day_week_id(e){
        this.row.day_week_id = e;
    }
    get day_week_id(){
        return this.row.day_week_id;
    }

    set dayRef(e){
        this.row.dayRef = e;
    }

    get dayRef(){
        return this.row.dayRef;
    }

    toJSON() {
        return {
            hours_departure: this.hours_departure,
            hours_arrival: this.hours_arrival,
            way_type: this.way_type,
            trip_favorite_id: this.trip_favorite_id,
            day_week_id: this.day_week_id,
            dayRef: this.dayRef
        }
    }
    
    isValid(){
        return true;
    }

}

module.exports =  TripFavDay;