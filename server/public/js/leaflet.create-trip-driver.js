// set center coordinates
var centerlat = 43.610769;
var centerlon = 3.8767159999999876;

// set default zoom level
var zoomLevel = 10;

// var js
var coords = [];
var markers = null;
var group = null;
var inc = 0;
var via = new Map();

//
// Init
//
var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);

var router = new L.Routing.osrmv1({
    serviceUrl: 'http://10.111.61.232:5000/route/v1'
});

document.getElementById('via0').style.display = "none";


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
            coords[this.id] = [ui.item.lat, ui.item.lng];
            // console.log(event);
            // console.log(ui);
            // coords.push([ui.item.lat, ui.item.lng]);
            // this.coords = [ui.item.lat, ui.item.lng];
            // console.log(ui)
            // via.set(ui, [ui.item.lat, ui.item.lng])
            // console.log(via)
            // var  blop = L.Routing.waypoint(L.latLng([ui.item.lat, ui.item.lng]));
            // return blop;

        }
    });

}



//
// Bouton Rechercher
//
function sendCoords() {

    var routeWaypoints = [];



    function sortWayPoints() {
        var addressList = document.getElementsByClassName('address_auto');

        for (var i = 0; i < addressList.length; ++i) {

            console.log(addressList[i].name)

            if (addressList[i].name) {

                if (addressList[i].name === "address_departure") {
                    routeWaypoints.push(L.Routing.waypoint(L.latLng(coords["address_departure"][0], coords["address_departure"][1])));
                }
                if (addressList[i].name === "address_arrival") {
                    routeWaypoints.push(L.Routing.waypoint(L.latLng(coords["address_arrival"][0], coords["address_arrival"][1])));
                }
            } else if (addressList[i].id === 'via0') {
                //do nothing
            } else {
                for (var j = 0; j < coords.length; ++j) {
                    if (addressList[i].id === j) {
                        routeWaypoints.push(L.Routing.waypoint(L.latLng(coords[i][0], coords[i][1])));
                    }
                }
            }
        }

       // console.log(routeWaypoints)
    }



    // delete old path
    if (group !== null) {
        map.removeLayer(group);
        map.removeLayer(markers);
    } else { }


    // path from --> to --> to

    sortWayPoints();

    // for (var i = 0; i < coords.length; ++i) {
    //     routeWaypoints.push(L.Routing.waypoint(L.latLng(coords[i][0], coords[i][1])));
    // }

    // zoom to
    var averageOfRoute = {
        lat: (routeWaypoints[0].latLng.lat + routeWaypoints[routeWaypoints.length - 1].latLng.lat) / 2,
        lng: (routeWaypoints[0].latLng.lng + routeWaypoints[routeWaypoints.length - 1].latLng.lng) / 2
    }
    map.flyTo([averageOfRoute.lat, averageOfRoute.lng], 10);


    // calcul path and add markers
    router.route(routeWaypoints, (err, routes) => {

        var routeline = L.Routing.line(routes[0]);
        group = L.layerGroup([routeline]).addTo(map);

        for (markerCoord of routes[0].inputWaypoints) {
            markers = L.marker([markerCoord.latLng.lat, markerCoord.latLng.lng]).addTo(map);
        }

    }, null, {});


    coords = [];
    markers = {};

}


//
// Boutons ajouter via
//
function viaMore() {

    var itm = document.getElementById('via0');
    var itmClone = itm.cloneNode(true);
    itmClone.childNodes[0].childNodes[0].id = inc++;
    itmClone.style.display = "block";

    document.getElementById("viaMaster").appendChild(itmClone);
    ajaxREQ();
}



//
// Boutons supprimer via
//
function viaLess(e) {
    e.parentNode.parentNode.remove();
}

window.onload = ajaxREQ();