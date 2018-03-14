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
        self.tripListSuccess(data) ;
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

  self.tripDeleteRow = function(id) {
      $.ajax({
          url: '/api/trip/' + id,
          type: 'DELETE',
          dataType: 'json',
          success: function (data) {
              $('tr[data-id=' + id + ']').remove();
          }
      });
  }

  self.tripBuildRow = function (trip) {
    var hoursDep = moment.parseZone(trip.hours_departure).local('fr').format('llll');
    var hoursArr = moment.parseZone(trip.hours_arrival).local().format('llll');
    var dep = trip.tripFavRef.addressDepRef;
    var arr = trip.tripFavRef.addressArrRef;
    
    var depAddress = dep.numero + " " + ((dep.rep == null )? "": dep.rep + " ");
    depAddress += dep.street + "<br>" + dep.city + " " + dep.zip_code;
  

    var arrAddress = arr.numero + " " + ((arr.rep == "" )? "": arr.rep + " ");
    arrAddress += arr.street + "<br>" +  arr.city + " " + arr.zip_code;

    if ( depAddress === " <br> " ) arrAddress = arr.latitude + " / " + arr.longitude;
    if ( arrAddress === " <br> " ) arrAddress = arr.latitude + " / " + arr.longitude;

    var row =
      "<tr data-id=" + trip.id_trip  +">" +
      "<td>" + trip.tripFavRef.name + "</td>" +
      "<td>" + ((trip.nb_seats)? trip.nb_seats : "Passager") + "</td>" +
      "<td>" + depAddress + "</td>" +
      "<td>" + arrAddress + "</td>" +
      "<td>" + hoursDep + "</td>" +
      "<td>" + hoursArr + "</td>" +
      "<td>" +
      "<a href='/trips/edit/"+ trip.id_trip +"' class='ui basic blue button'>   Editer   </a>" + "<br><br>" +
      "<a class='ui basic red button' onclick='listTripCtrl.tripDeleteRow(" + trip.id_trip + ")'>Suppr.</a>" +
      "</td>" +
      "</tr>";

    return row;
  }


  ////////////////////////////////////////////////////////////
  //////// ON LOAD ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  window.onload = self.init;


})(listTripCtrl);
