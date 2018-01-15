var tripFavoriteCtrl = {
    init: function() {
      $('#displayTrip').onload(function() {
        var tripInfo = {
           lastname: $('td[name="test"]').val(),
        //   firstname: $('input[name="firstname"]').val(),
        //   gender: $('input[name="gender"]:checked').val(),
        //   birthday: $('input[name="birthday"]').val(),
        //   mobile: $('input[name="mobile_phone"]').val(),
        //   email: $('input[name="email"]').val(),
        //   formation: $('input[name="formation"]').val(),
        //   login: $('input[name="login"]').val()
        };
  
        $.ajax({
          method: 'GET',
          url: '/api/trip_favorite',
          data: tripInfo,
          success : function(data) {
            // var data = xhr.responseJSON;
            console.log(data);
            // window.location.replace('/home');
            Kovoit.pushNotification('success', data.success)},
  
          error : function(xhr) {
            var data = xhr.responseJSON;
            console.log(data);
            Kovoit.pushNotification('error', data.errors)}
          }
        );
  
  
      });
    }
  };
  
  window.onload = tripFavoriteCtrl.init;