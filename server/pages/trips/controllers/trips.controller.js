let TripService = require(__base + 'api/trip/services/trip.service');
let moment = require(__base + 'config/moment');

/**
 * Index
 */
module.exports.index = function (req, res) {
  res.render('trips/views/index');
};


/**
 * Edit
 */
module.exports.edit = function (req, res) {

  TripService.findByID(req.params.idTrip, (err, trip) => {
    if (trip && trip.tripFavRef.user_id == req.session.user.id) {

      // 2018-02-07T15:24:04.000Z
        trip.hours_departure = moment(trip.hours_departure).local().format('YYYY-MM-DDThh:mm');
        trip.hours_arrival = moment(trip.hours_arrival).local().format('YYYY-MM-DDThh:mm');

      res.render('trips/views/edit',
        {
          trip: trip,
        });
    }
    else {
      res.render('core/views/forbidden');
    }
  });

};