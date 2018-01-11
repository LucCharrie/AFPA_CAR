let CarsService = require(__base + 'api/cars/services/cars.service');

/**
 * Cars index page
 */
module.exports.index = function(req, res) {
    res.render('cars-user/views/index');
}


/**
 * Car show page
 */
module.exports.show = function(req, res) {
    CarsService.find(req.params.idCar, (err, car) => {
        res.render('cars-user/views/show', { car: car });
    });
}