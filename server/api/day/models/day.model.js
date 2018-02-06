class Day {

    constructor(row) {
        this.row = row || {
            id_day_week: null,
            day: ''
        }
    }

    get id() {
        return this.row.id_day_week;
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