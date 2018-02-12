let TripFavoriteService = require('../services/trip_favorite.service')
let TripFavoriteModel = require('../models/trip_favorite.model')






module.exports.list = function (req, res) {
    TripFavoriteService.list(req.session.user.id, (err, tripFavorite) => {
        res.send({ trips: tripFavorite })
    });
}

module.exports.create = function (req, res) {

    let tripFavoriteModel = {
        name: req.body.name,
        nb_seats: req.body.nb_seats,
        driver: req.body.driver,
        user_id: req.session.user.id,
        car_user_id: req.body.car_user_id,
        address_departure_id: req.body.address_departure_id * 1,
        address_arrival_id: req.body.address_arrival_id * 1,
        lun: JSON.parse(req.body.lun),
        mar: JSON.parse(req.body.mar),
        mer: JSON.parse(req.body.mer),
        jeu: JSON.parse(req.body.jeu),
        ven: JSON.parse(req.body.ven),
        sam: JSON.parse(req.body.sam),
        dim: JSON.parse(req.body.dim)
    }

    TripFavoriteService.create(tripFavoriteModel, (err, tripFavorite) => {
        res.json(tripFavorite);
    });
}






module.exports.read = function (req, res) {
    res.json(req.trip_favorite);
}

module.exports.update = function (req, res) {
    TripFavoriteService.update(req.trip_favorite, (err, tripFavorite)=>{
        res.json(tripFavorite);
    });
}

module.exports.delete = function (req, res) {

    TripFavoriteService.delete(req.trip_favorite.id_trip_favorite, (err) => {
        if (err) {
            res.status(500).json({ 'error': 'Failed to delete Trip Favorite !' });
        } else {
            res.json({ 'success': 'Trip Favorite' + req.trip_favorite.id_trip_favorite + ' Delete' });
        }
    });
}






// MIDDLEWARE
exports.idTripFavorite = function (req, res, next, id) {
    if (isNaN(id)) {
        return res.status(400).send({
            message: 'Trip favorite is invalid'
        });
    }

    TripFavoriteService.findByID(id, (err, trip_favorite) => {
        if (!trip_favorite) {
            return next(new Error('Failed to load trip favorite ' + id));
        }
        req.trip_favorite = trip_favorite;
        next();
    });
}

