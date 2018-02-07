/*******************************************************************************
 * API JS CO-VOITURAGE									  		                                  
 *******************************************************************************/

var Kovoit = {};

(function (self) {
  //
  // PRIVATE VARS
  //
  var MEDIA_SRC = '/public/img';
  // var userSession = session.user;

  //
  // PRIVATE FUNCS
  //

  //
  // PUBLIC VARS
  //

  //
  // PUBLIC FUNCS
  //
  self.closeNotification = function(elem) {
    $(elem).closest('.message').transition('fade');
  }

  self.pushNotification = function(type, notif, parent) { // type : [info, errors, success], notif : Array[{msg: ''}]
    var notes = '';
    var className = '';
    var titleName = '';

    if (parent === undefined) {
      parent = $('.notifications-container');
    }

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
        notification +=   '<i class="close icon" onclick="Kovoit.closeNotification(this)"></i>';
        notification +=   '<div class="header">' + titleName + '</div>';
        notification +=   '<ul class="list notes">';
        notification +=     notes;
        notification +=   '</ul>';
        notification += '</li>';

    var element = $(notification);

    $(parent).html(element);
    element.show();
  }
  
})(Kovoit);