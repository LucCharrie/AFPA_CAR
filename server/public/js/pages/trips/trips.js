var listTripCtrl = {};


(function (self) {
  //
  // Init
  //
  self.init = function () {
    $.ajax({
      url: '/api/trip',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        self.tripListSuccess(data);
      }
    });
  }

  self.tripListSuccess = function (trips) {
    $.each(trips, function (index, trip) {
        self.tripAddRow(trip);
    });
  }

  self.tripAddRow = function (trip) {
    $('.ui.table tbody').append(self.tripBuildRow(trip));
  }

  self.tripDeleteCard = function(id) {
      $.ajax({
          url: '/api/trip/' + id,
          type: 'DELETE',
          dataType: 'json',
          success: function (data) {
              $('.card[data-id=' + id + ']').remove();
          }
      });
  }

  self.tripBuildRow = function (trip) {

    var dep = moment.parseZone(trip.hours_departure).local().format('Do MMMM YYYY, h:mm:ss a');
    var arr = moment.parseZone(trip.hours_arrival).local().format('Do MMMM YYYY, h:mm:ss a');
    var row =
      "<tr>" +
      "<td>" + trip.tripFavRef.addressDepRef.numero + " / " + trip.tripFavRef.addressDepRef.longitude + "</td>" +
      "<td>" + trip.tripFavRef.addressArrRef.latitude + " / " + trip.tripFavRef.addressArrRef.longitude + "</td>" +
      "<td>" + dep + "</td>" +
      "<td>" + arr + "</td>" +
      "<td>" +
      "<a href='/trips/edit/"+ trip.id_trip +"' class='ui basic blue button'> Editer</a>" +
      "<a class='ui basic red button' onclick='listTripCtrl.tripDeleteCard(" + trip.id_trip + ")'> Supprimer</a>" +
      "</td>" +
      "</tr>";

    return row;
  }


  ////////////////////////////////////////////////////////////
  //////// ON LOAD ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  window.onload = self.init;


})(listTripCtrl);

