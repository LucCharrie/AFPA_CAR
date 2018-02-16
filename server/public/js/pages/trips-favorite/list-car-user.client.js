
var listCars = {};


(function (self) {

  //
  // Init est appelé dans le window.onload de "./create-trip-driver.client.js"
  //
  self.init = function () {
    $.ajax({
      url: '/api/cars-user/me',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        self.listSuccess(data);
      }
    });
  }


  self.listSuccess = function (data) {
    $.each(data, function (index, vals) {
      self.addData(vals);
    });
  }


  self.addData = function (data) {
    $('#car_user_id').append(self.buildData(data));
  }


  self.buildData = function (data) {
    var card = "<option value="+ 
                data.id + ">" + 
                data.car.brand.brand_name + " " + 
                data.car.model_name + 
                "</option>";
    return card;
  }


})(listCars);

