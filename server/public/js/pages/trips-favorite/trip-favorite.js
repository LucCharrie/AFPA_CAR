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
          url: '/api/trip_favorite/' + id,
          type: 'DELETE',
          dataType: 'json',
          success: function (data) {
              $('.card[data-id=' + id + ']').remove();
              // Kovoit.pushNotification('success', data.success);
          }
      });
  }

  self.tripFavBuildCard = function (trip) {
    console.log(trip);

    var dep = trip.tripFavRef.addressDepRef;
    var arr = trip.tripFavRef.addressArrRef;
    
    var depAddress = dep.numero + " " + ((dep.rep == null )? "": dep.rep + " ");
    depAddress += dep.street + "<br>" + dep.city + " " + dep.zip_code;

    var arrAddress = arr.numero + " " + ((arr.rep == "" )? "": arr.rep + " ");
    arrAddress += arr.street + "<br>" +  arr.city + " " + arr.zip_code;

    if ( depAddress === " <br> " ) arrAddress = arr.latitude + " / " + arr.longitude;
    if ( arrAddress === " <br> " ) arrAddress = arr.latitude + " / " + arr.longitude;

    var card =
      "<div class='card card-trip-driver' data-id='" + trip.id_trip_favorite + "'>" +
      "<div class='content'>" +
      "<div class='header'> " + trip.name + " </div>" +
      "</div>" +
      "<div class='content-body'>" +
      "<table class='ui celled table table-info'>" +
      "<tbody>" +
      "<tr>" +
      "<td> Départ </td>" +
      "<td>" + depAddress + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Arrivée </td>" +
      "<td>" + arrAddress + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td> Jours </td>" +
      "<td>" + trip.days +"</td>" +
      "</tr>" +
      "</table>" +
      "</div>" +
      "<div class='extra content'>" +
      "<a href='/trips-favorite/edit/"+ trip.id_trip_favorite +"' class='ui basic blue button'> Editer</a>" +
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
