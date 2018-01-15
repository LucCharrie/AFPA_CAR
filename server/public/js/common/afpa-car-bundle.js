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

  //
  // PUBLIC VARS
  //

  //
  // PUBLIC FUNCS
  //

  // type : [info, errors, success]
  // notif : Array[{msg: ''}]
  //
  Kovoit.pushNotification = function(type, notif) {
    var notes = '';
    var className = '';
    var titleName = '';

    switch (type)
    {
      case 'error':   className = 'negative'; titleName = 'Erreur'; break;
      case 'info':    className = 'info';     titleName = 'Information'; break;
      case 'success': className = 'positive'; titleName = 'Succès'; break;
      default: return;
    }

    for (var note of notif) {
      notes += '<li>' + note.msg + '</li>';
    }

    var notification = '<li class="ui message notification ' + type + '">';
        notification +=   '<i class="close icon"></i>';
        notification +=   '<div class="header">' + titleName + '</div>';
        notification +=   '<ul class="list notes">';
        notification +=     notes;
        notification +=   '</ul>';
        notification += '</li>';

    var element = $(notification);

    $('.notifications-container').prepend(element);
    element.show();

    setTimeout(function() {
      element.fadeOut('slow', function() {
        element.remove();
      });
    }, 3000);
	}

})();

