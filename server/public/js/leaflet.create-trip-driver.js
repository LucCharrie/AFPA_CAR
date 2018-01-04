// set center coordinates
var centerlat = 43.610769;
var centerlon = 3.8767159999999876;

// set default zoom level
var zoomLevel = 10;

// var js
var coords = [];
var group = null;
var inc = 0;

//
// Init
//
var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);

var router = new L.Routing.osrmv1({
    serviceUrl: 'http://10.111.61.232:5000/route/v1'
});

document.getElementById('viaTitle').style.display = "none";
document.getElementById('via').style.display = "none";



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
                            "value": item.num + ', ' + item.name + ', ' + item.city,
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
            //coords[this.name] = [ui.item.lat, ui.item.lng];
            coords.push([ui.item.lat, ui.item.lng]);
        }
    });

}



//
// Bouton Rechercher
//
function sendCoords() {

    if (group !== null) {
        map.removeLayer(group);
    } else {
        //document.getElementById('viaMore').style.visibility = "visible";
    }

    document.getElementById('viaMore').style.visibility = "visible";


    var routeWaypoints = [];

    for (var i = 0; i < coords.length; ++i) {
        routeWaypoints.push(L.Routing.waypoint(L.latLng(coords[i][0], coords[i][1])));
    }


    var averageOfRoute = {
        lat: (routeWaypoints[0].latLng.lat + routeWaypoints[routeWaypoints.length - 1].latLng.lat) / 2,
        lng: (routeWaypoints[0].latLng.lng + routeWaypoints[routeWaypoints.length - 1].latLng.lng) / 2
    }

    router.route(routeWaypoints, (err, routes) => {
        var routeline = L.Routing.line(routes[0]);
        map.flyTo([averageOfRoute.lat, averageOfRoute.lng], 9);
        group = L.layerGroup([routeline]).addTo(map);
    }, null, {});


    coords = [];

}



//
// Boutons ajouter via
//
function viaMore() {

    var via = "via" + inc;

    document.getElementById('viaTitle').style.display = "block";
    var itm = document.getElementById('via').style.display = "block";

    var itmClone = itm.cloneNode(true);

    document.getElementById("viaMaster").appendChild(itmClone);

    // if (!document.getElementById("viaTitle")) {
    //     insertVia.innerHTML += "<label id=\"viaTitle\"> Ajouter destination </label>"
    // } else {}

    // var pushElement = "<div class=\"field\" id=\"" + via + "\">";
    // pushElement += "<div class=\"ui action input\" >";
    // pushElement += "<input type=\"text\" name=\"" + via + "\" class=\"address_auto\">";
    // pushElement += "<button class=\"ui button\" onClick=\"viaLess(" + via + ")\">X</button>";
    // pushElement += "</div>";
    // pushElement += "</div>";
    // document.getElementById("insertVia").innerHTML = pushElement;

    inc++;

    ajaxREQ();
}

//
// Boutons supprimer via
//
function viaLess(val) {

    inc--;

    var elem = document.getElementById(val.id);
    elem.parentNode.removeChild(elem);

    if (inc === 0) {
        var elemTitle = document.getElementById("viaTitle");
        elemTitle.parentNode.removeChild(elemTitle);
    }

}

window.onload = ajaxREQ();