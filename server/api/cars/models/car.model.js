let CarBrandModel = require(__base + 'api/cars-brands/models/car-brand.model');

class CarModel
{
    constructor (row) {
        this.row = row || {
            id_car: null,
            model_name: '',
            brandRef: ''
        };

        this.row.brandRef = new CarBrandModel(this.row.brandRef);
    }

    get id() {
        return this.row.id_car;
    }
    set id(val) {
        this.row.id_car = val;
    }

    get model_name() {
        return this.row.model_name;
    }
    set model_name(val) {
        this.row.model_name = val;
    }

    get brand() {
        return this.row.brandRef;
    }
    set brand(val) {
        this.row.brandRef = val;
    }

    toJSON() {
        return {
            id: this.id,
            model_name: this.model_name,
            brand: this.brand
        };
    }

    isValid() {
        return true;
    }
}

module.exports = CarModel
