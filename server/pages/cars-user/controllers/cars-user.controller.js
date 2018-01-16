let CarsUserService = require(__base + 'api/cars-user/services/cars-user.service');

/**
 * Cars create page
 */
module.exports.create = function(req, res) {
    res.render('cars-user/views/create');
}

/**
 * Car's list
 */
module.exports.list = function(req, res) {
    res.render('cars-user/views/list');
}

/**
 * Car show page
 */
module.exports.show = function(req, res) {
    CarsUserService.find(req.params.idCar, (err, car) => {
        res.render('cars-user/views/show', { car: car });
    });
}