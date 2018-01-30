var listTripFavCtrl = {};


(function (self) {
  //
  // Init
  //
  self.init = function () {
    $.ajax({
      url: '/api/trip_favorite',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        self.tripFavListSuccess(data);
      }
    });
  }

  self.tripFavListSuccess = function (tripFav) {
    $.each(tripFav, function (index, trip) {
      for (var i = 0; i < trip.length; ++i) {
        self.tripFavAddCard(trip[i]);
      }
    });
  }

  self.tripFavAddCard = function (trip) {
    $('.ui.cards').append(self.tripFavBuildCard(trip));
  }

  self.tripFavDeleteCard = function(id) {
      $.ajax({
          url: '' + id,
          type: 'DELETE',
          dataType: 'json',
          success: function (data) {
              $('.card[data-id=' + id + ']').remove();
              Kovoit.pushNotification('success', data.success);
          }
      });
  }

  self.tripFavBuildCard = function (trip) {
    console.log(trip);
    var card =
      "<div class='card card-trip-driver' data-id='" + trip.id_trip_favorite + "'>" +
      "<div class='content'>" +
      "<div class='header'> " + trip.name + " </div>" +
      "</div>" +
      "<div class='content-body'>" +
      "<table class='ui celled table table-info'>" +
      "<tbody>" +
      "<tr>" +
      "<td> Voiture </td>" +
      "<td>" + trip.brand_name + "  " + trip.model_name + "   " + trip.numimmat + "  " + trip.color + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Nbr de places </td>" +
      "<td>" + trip.nb_seats + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Départ à </td>" +
      "<td>" + trip.hours_departure + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Arrivée à </td>" +
      "<td>" + trip.hours_arrival + "</td>" +
      "</tr>" +
      "</table>" +
      "</div>" +
      "<div class='extra content'>" +
      "<a href='/trips-driver/edit/'" + trip.id_trip_favorite + "' class='ui basic blue button'> Editer</a>" +
      "<a class='ui basic red button' onclick='listTripFavCtrl.tripFavDeleteCard(" + trip.id_trip_favorite + ")'> Supprimer</a>" +
      "</div>" +
      "</div>";

    return card;
  }


  ////////////////////////////////////////////////////////////
  //////// ON LOAD ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  window.onload = self.init;


})(listTripFavCtrl);

