let TripFavoriteService = require('../services/trip_favorite.service')
let TripFavoriteModel = require('../models/trip_favorite.model')

module.exports.list = function (req, res) {
    TripFavoriteService.list((err, tripFavorite) => {
        res.json(tripFavorite);
    });
}

module.exports.create = function (req, res) {

    let tripFavoriteModel = new TripFavoriteModel({
        user_id: req.session.user.id,
        car_user_id: req.session.user.car_user_id
    });

    TripFavoriteService.create(tripFavoriteModel, (err, tripFavorite) => {
        res.json(tripFavorite);
    });
}

module.exports.delete = function (req, res) {
    TripFavoriteService.delete((err, tripFavorite) => {
        if (err) {
            res.status(500).json({ 'error': 'Failed to delete Trip Favorite !' });
        } else {
            res.json({ 'success': ' Trip Favorite !', ' Trip Favorite': tripFavorite });
        }
    });
}

module.exports.read = function(req, res) {
    res.json(req.trip);
}

exports.tripByID = function (req, res, next, id) {
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Trip favorite is invalid'
      });
    }
  
    TripFavoriteService.findByID(id, (err, trip) => {
      if (!trip) {
        return next(new Error('Failed to load trip favorite ' + id));
      }
  
      req.trip = trip;

      next();
    });
}
    
