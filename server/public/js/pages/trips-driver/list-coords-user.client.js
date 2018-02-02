var listCoords = {};


(function (self) {

  //
  // Init est appelé dans le window.onload de "./create-trip-driver.client.js"
  //

  self.init = function () {
    $.ajax({
      url: '/api/addresses-user/me',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        createTripFavorite.coords.push(data)
      }
    });
  }
})(listCoords);

