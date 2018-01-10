/*******************************************************************************
 * API JS CO-VOITURAGE									  		                                  
 *******************************************************************************/

var Kovoit = {};

(function() {
  //
  // PRIVATE VARS
  //
  var MEDIA_SRC = '/public/img';

  //
  // PRIVATE FUNCS
  //
  cleanParams = function() {

  };

  //
  // PUBLIC VARS
  //

  //
  // PUBLIC FUNCS
  //
  Kovoit.pushNotifications = function(type, notifs) {
    var listMessages = '';

    if (type != 'info' && type != 'error' && type != 'success') {
      return;
    }

    for (var notif of notifs) {
      listMessages += '<li>' + notif.msg + '</li>';
    }

    var notification = '<li class="notification ' + type + '">';
        notification +=   '<ul class="message">';
        notification +=     listMessages;
        notification +=   '</ul>';
        notification += '</li>';

    var e = $('.notifications-container').prepend(notification);
    console.log(e);
    $('.notification').fadeIn('slow');

    setTimeout(function() {
      e.fadeOut('slow', function() {
        e.remove();
      });
    }, 3000);
	}

})();

