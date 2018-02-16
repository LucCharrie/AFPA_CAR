var listAddress = {};


(function (self) {

  //
  // Init est appelé dans le window.onload de "./create-trip-driver.client.js"
  //

  self.init = function (id) {
    $.ajax({
      url: '/api/addresses-user/me',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        self.listSuccess(id, data);
      }
    });
  }


  self.listSuccess = function (id, data) {
    $.each(data, function (index, vals) {
      self.addData(id, vals);
    });
  }


  self.addData = function (id, data) {
    $(id).append(self.buildData(data));
  }


  self.buildData = function (data) {
    var card = "<option value=" +
      data.address.id + ">" +
      data.libelle +
      "</option>";
    return card;
  }


})(listAddress);

