let CarsService = require(__base + 'api/cars/services/cars.service');

/**
 * Cars index page
 */
module.exports.index = function(req, res) {
    CarsService.list((err, cars) => {
        res.render('cars-user/views/index', { cars: cars });
    });
}


/**
 * Car show page
 */
module.exports.show = function(req, res) {
    CarsService.find(req.params.idCar, (err, car) => {
        res.render('cars-user/views/show', { car: car });
    });
}