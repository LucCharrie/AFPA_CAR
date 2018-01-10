var signUpController = {
  init: function() {

    $('#registerBtn').click(function() {
      var form = {
        email: $('input[name="email"]').val(),
        login: $('input[name="login"]').val(),
        firstname: $('input[name="firstname"]').val(),
        lastname: $('input[name="lastname"]').val(),
        password: $('input[name="password"]').val(),
        passwordConfirmation: $('input[name="passwordConfirmation"]').val(),
      };

      $.ajax({
        dataType: "json",
        method: 'POST',
        url: '/api/users',
        data: form
      })
      .catch(function(xhr) {
        var data = xhr.responseJSON;
        Kovoit.pushNotifications('error', data.errors);
      });
    });
  }
};

window.onload = signUpController.init;