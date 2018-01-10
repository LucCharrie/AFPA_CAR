var signInController = {
  init: function() {
    $('#loginBtn').click(function() {
      var form = {
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val()
      };

      $.ajax({
        method: 'POST',
        url: '/api/users/auth',
        data: form
      })
      .done(function(msg) {
        console.log(msg);
      });
    });
  }
};

window.onload = signInController.init;