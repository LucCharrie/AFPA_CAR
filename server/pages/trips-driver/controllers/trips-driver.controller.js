let TripFavoriteService = require(__base + 'api/trip_favorite/services/trip_favorite.service');



/**
 * Index
 */
module.exports.index = function(req, res) {
  res.render('trips-driver/views/index');

};

/**
 * Edit
 */
module.exports.edit = function(req, res){
  TripFavoriteService.findByID(req.params.idTripFavorite, (err, tripFavorite) => {
    // if (tripFavorite && tripFavorite.user.id == req.session.user.id) {
    //     res.render('cars-user/views/edit', { tripFavorite: tripFavorite });
    // }
    // else {
    //     res.render('core/views/forbidden');
    // }
    res.render('trips-driver/views/edit', { tripFavorite: tripFavorite });

});
}

/**
 * Create
 */
module.exports.create = function(req, res) {
  res.render('trips-driver/views/create');
};