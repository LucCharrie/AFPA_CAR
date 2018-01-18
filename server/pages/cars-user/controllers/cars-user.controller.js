let CarsUserService = require(__base + 'api/cars-user/services/cars-user.service');

/**
 * Cars create page
 */
module.exports.create = function(req, res) {
    res.render('cars-user/views/create');
}

/**
 * Cars edit page
 */
module.exports.edit = function(req, res) {
    CarsUserService.find(req.params.idCarUser, (err, carUser) => {
        if (carUser && carUser.user.id == req.session.user.id) {
            res.render('cars-user/views/edit', { carUser: carUser });
        }
        else {
            res.render('core/views/forbidden');
        }
    });
}

/**
 * Car's list
 */
module.exports.list = function(req, res) {
    res.render('cars-user/views/list');
}