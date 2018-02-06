class Day {

    constructor(row) {
        this.row = row || {
            id_day_week: null,
            day: ''
        }
    }

    set id_day_week(e){
        this.row.id_day_week = e;
    }

    get id_day_week() {
        return this.row.id_day_week;
    }

    set day(e){
        this.row.day = e;
    }
    get day() {
        return this.row.day;
    }

    toJSON() {
        return {
            id_day_week: this.id_day_week,
            day: this.day
        }
    }

    isValid(){
        return true;
    }
}

module.exports = Day;