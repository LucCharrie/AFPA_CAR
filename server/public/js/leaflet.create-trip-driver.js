// set center coordinates
var centerlat = 43.610769;
var centerlon = 3.8767159999999876;

// set default zoom level
var zoomLevel = 10;

// var js
var coords = new Map();
var markers = [];
var group = null;
var inc = 0;
//var via = new Map();

//
// Init
//
var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);

var router = new L.Routing.osrmv1({
    serviceUrl: 'http://10.111.62.34:5000/route/v1'
});



//
// Ajax
//
function ajaxREQ() {
    $('.address_auto').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/api/address",
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            "value": item.numero + ', ' + item.street + ', ' + item.city,
                            "lat": item.latitude,
                            "lng": item.longitude
                        };
                    }));
                }
            });
        },
        minLength: 2,

        // Push les coordonnées gps dans un tableau
        select: function (event, ui) {
            coords.set(this.id, [ui.item.lat, ui.item.lng])
        }
    });

}



//
// Bouton Rechercher
//
function sendCoords() {

    var routeWaypoints = [];



    function sortWayPoints() {

        var addressList = document.getElementById('parentVia');

        var addressListChild = addressList.getElementsByTagName('input');

        for (var i = 0; i < addressList.children.length; ++i) {

            for (var values of coords) {
                if (addressListChild[i].id === values[0]) {
                    routeWaypoints.push(L.Routing.waypoint(L.latLng(values[1][0], values[1][1])));
                }
            }
        }
    }



    // delete old path & markers
    if (group !== null) {
        map.removeLayer(group);

        for (var mark of markers) {
            console.log(mark);
            map.removeLayer(mark);
        }
        markers = [];

    } else { }


    // path from --> to --> to
    sortWayPoints();

    //zoom to
    var averageOfRoute = {
        lat: (routeWaypoints[0].latLng.lat + routeWaypoints[routeWaypoints.length - 1].latLng.lat) / 2,
        lng: (routeWaypoints[0].latLng.lng + routeWaypoints[routeWaypoints.length - 1].latLng.lng) / 2
    }
    map.flyTo([averageOfRoute.lat, averageOfRoute.lng], 10);


    // calcul path and add markers
    router.route(routeWaypoints, (err, routes) => {

        var routeline = L.Routing.line(routes[0]);
        group = L.layerGroup([routeline]).addTo(map);

        //add markers
        for (var markerCoord of routes[0].inputWaypoints) {
            markers.push( L.marker([markerCoord.latLng.lat, markerCoord.latLng.lng]).addTo(map) );
        }
    }, null, {});



}


//
// Boutons ajouter via
//
function viaMore() {

    var id = 'via_' + inc++;

    var viaList = document.createElement("li");
    viaList.setAttribute('class', 'field');

    var viaDiv = document.createElement("div");
    viaDiv.setAttribute('class', 'ui action input');

    var viaInput = document.createElement("input");
    viaInput.setAttribute("id", id);
    viaInput.setAttribute('class', 'address_auto');
    viaInput.setAttribute('type', 'text');
    viaInput.setAttribute('placeholder', 'Ajouter une destination');

    var viaButton = document.createElement("button");
    viaButton.setAttribute('class', 'ui button');
    viaButton.setAttribute('onclick', 'viaLess(this)');
    viaButton.textContent = 'X';

    viaDiv.appendChild(viaInput);
    viaDiv.appendChild(viaButton);
    viaList.appendChild(viaDiv)


    var viaEnd = document.getElementById("viaEnd");
    document.getElementById("parentVia").insertBefore(viaList, viaEnd);

    ajaxREQ();
}



//
// Boutons supprimer via
//
function viaLess(e) {
    e.parentNode.parentNode.remove();
}

window.onload = ajaxREQ();