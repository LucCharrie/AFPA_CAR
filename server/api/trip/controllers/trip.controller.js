//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let TripService = require('../services/trip.service');


/**
 * List of Address
 */
module.exports.list = function(req, res) {
    TripService.list(req.session.user.id, (err, tripList) => {
        res.json(tripList);
    });
}

module.exports.create = function(req, res) {
    TripService.create((err, trip) => {
        res.json(trip);
    });
}

module.exports.delete = function(req, res) {
    TripService.delete(req.trip.id_trip, (err, trip) => {
        if (err) {
            res.status(500).json({ 'error': 'Failed to delete Trip !' });
        } else {
            res.json({ 'success': ' Trip !', ' Trip': trip });
        }
    });
}

module.exports.update = function(req, res) {
    TripService.update(req.trip, (err, trip)=> {
        if (err) {
            res.status(500).json({ 'error': 'Failed to update Trip !' });
        } else {
            res.json(trip);
        } 
    })
}

module.exports.read = function(req, res) {
    res.json(req.trip);
}

exports.tripByID = function(req, res, next, id) {
    if (isNaN(id)) {
        return res.status(400).send({
            message: 'Trip is invalid'
        });
    }

    TripService.findByID(id, (err, trip) => {
        if (!trip) {
            return next(new Error('Failed to load trip ' + id));
        }

        req.trip = trip;

        next();
    });
}