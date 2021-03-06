var usersProfileController = {};

(function (self) {
    //
    // Init
    //
    self.init = function() {
      $('#updateUserBtn').click(function() {
        var form = {
            lastname: $('input[name="lastname"]').val(),
            firstname: $('input[name="firstname"]').val(),
            gender: $('input[name="gender"]:checked').val(),
            birthday: $('input[name="birthday"]').val(),
            mobile: $('input[name="mobile_phone"]').val(),
            email: $('input[name="email"]').val(),
            formation: $('input[name="formation"]').val(),
            login: $('input[name="login"]').val()
        };

        $.ajax({
          method: 'PUT',
          url: '/api/users/me',
          data: form,
          success : function(data) {
            Kovoit.pushNotification('success', data.success)},

          error : function(xhr) {
            var data = xhr.responseJSON;
            Kovoit.pushNotification('error', data.errors)}
          }
        );
    });
  }

    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;

})(usersProfileController);