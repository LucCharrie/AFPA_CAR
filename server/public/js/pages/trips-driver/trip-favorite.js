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
    $.each(tripFav, function (index, tripFav) {
      for (var i = 0; i < tripFav.length; ++i) {
        self.tripFavAddCard(tripFav[i]);
        console.log(tripFav[i])
      }
    });
  }

  self.tripFavAddCard = function (tripFav) {

    $('.ui.cards').append(self.tripFavBuildCard(tripFav));
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

  self.tripFavBuildCard = function (tripFav) {
    var card =
      "<div class='card card-trip-driver' data-id='" + tripFav.id_trip_favorite + "'>" +
      "<div class='content'>" +
      "<div class='header'> " + tripFav.name + " </div>" +
      "</div>" +
      "<div class='content-body'>" +
      "<table class='ui celled table table-info'>" +
      "<tbody>" +
      "<tr>" +
      "<td> Voiture </td>" +
      "<td>" + tripFav.brand_name + "  " + tripFav.model_name + "   " + tripFav.numimmat + "  " + tripFav.color + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Nbr de places </td>" +
      "<td>" + tripFav.nb_seats + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Départ à </td>" +
      "<td>" + tripFav.hours_departure + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Arrivée à </td>" +
      "<td>" + tripFav.hours_arrival + "</td>" +
      "</tr>" +
      "</table>" +
      "</div>" +
      "<div class='extra content'>" +
      "<a href='/trips-driver/edit/'" + tripFav.id_trip_favorite + "' class='ui basic blue button'> Editer</a>" +
      "<a class='ui basic red button' onclick='listTripFavCtrl.tripFavDeleteCard(" + tripFav.id_trip_favorite + ")'> Supprimer</a>" +
      "</div>" +
      "</div>";

    return card;
  }


  ////////////////////////////////////////////////////////////
  //////// ON LOAD ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  window.onload = self.init;


})(listTripFavCtrl);

