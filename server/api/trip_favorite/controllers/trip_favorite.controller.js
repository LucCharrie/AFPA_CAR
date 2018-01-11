let TripFavoriteService = require('../services/trip_favorite.service')
let TripFavoriteModel = require('../models/trip_favorite.model')

module.exports.list = function (req, res) {
    TripFavoriteService.list((err, tripFavorite) => {
        res.json(tripFavorite);
    });
}

module.exports.create = function (req, res) {
    TripFavoriteService.create((err, tripFavorite) => {
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

exports.tripByID = function (req, res, next, id) {
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Trip favorite is invalid'
      });
    }
  
    TripFavoriteService.findById(id, (err, trip) => {
      if (!trip) {
        return next(new Error('Failed to load trip favorite ' + id));
      }
  
      req.tripFavorite = tripFavorite;
      next();
    });
  };
    
}