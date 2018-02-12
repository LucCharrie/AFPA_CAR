let TripFavoriteService = require(__base + 'api/trip_favorite/services/trip_favorite.service');



module.exports.index = function (req, res) {
    res.render('trips-driver/views/index');
};


module.exports.edit = function (req, res) {
  TripFavoriteService.findByID(req.params.idTripFavorite, (err, tripFavorite) => {
    if (tripFavorite && tripFavorite.user_id == req.session.user.id) {
      res.render('trips-driver/views/edit', { trip: tripFavorite });
    }
    else {
      res.render('core/views/forbidden');
    }
  });
}


module.exports.create = function (req, res) {
  res.render('trips-driver/views/create');
};