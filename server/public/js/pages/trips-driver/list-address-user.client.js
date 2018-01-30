var listAddress = {};


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
        console.log(data);

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
    $('#address_user').append(self.buildData(data));
  }


  self.buildData = function (data) {
    var card = "<option value="+ 
                data.id + "_" + 
                data.user.id+">" + 
                data.address + 
                "</option>";
    return card;
  }


})(listAddress);

