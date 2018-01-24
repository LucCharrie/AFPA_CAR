var tripFavoriteCtrl = {};

(function (self) {

  var req = new XMLHttpRequest();

  req.onreadystatechange = function (event) {
    //console.log( event );

    XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {

        var toJson = JSON.parse(this.responseText);
        console.log()
        document.getElementById('displayTrips').innerHTML = this.responseText;
      } else {
        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
      }
    }
  };


  window.onload = function () {
    req.open('GET', '/api/trip_favorite', true);
    req.send();
  }


})(tripFavoriteCtrl);
