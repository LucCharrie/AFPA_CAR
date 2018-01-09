class CarBrandModel
{
    constructor (row) {
        this.row = row || {
            id_car_brand: null,
            brand_name: ''
        };
    }

    get id() {
        return this.row.id_car_brand;
    }
    set id(val) {
        this.row.id_car_brand = val;
    }

    get brand_name() {
        return this.row.brand_name;
    }
    set brand_name(val) {
        this.row.brand_name = val;
    }

    toJSON() {
        return {
            id: this.id,
            brand_name: this.brand_name
        };
    }

    isValid() {
        return true;
    }
}

module.exports = CarBrandModel
