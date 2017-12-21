// set center coordinates
var centerlat = 43.30;
var centerlon = 5.36;

// set default zoom level
var zoomLevel = 10;


var coords = [];


//
// Init
//
var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);

var router = new L.Routing.osrmv1({
    serviceUrl: 'http://10.111.61.97:5000/route/v1'
});



//
// Ajax
//
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
                        "value": item.num + ' ' + item.name + ', ' + item.city,
                        "lat": item.latitude,
                        "lng": item.longitude
                    };
                }));
            }
        });
    },
    minLength: 2,
    select: function (event, ui) {
        coords[this.name] = [ui.item.lat, ui.item.lng];
        //console.log(coords);
    }
});


//////////////////


function sendCoords() {

    var routeWaypoints = [
        L.Routing.waypoint(L.latLng(coords.address_departure[0], coords.address_departure[1])),
        L.Routing.waypoint(L.latLng(coords.address_arrival[0], coords.address_arrival[1]))
    ];

    var averageOfRoute = {
        lat: (routeWaypoints[0].latLng.lat + routeWaypoints[routeWaypoints.length - 1].latLng.lat) / 2,
        lng: (routeWaypoints[0].latLng.lng + routeWaypoints[routeWaypoints.length - 1].latLng.lng) / 2
    }

    router.route(routeWaypoints, (err, routes) => {
        var routeline = L.Routing.line(routes[0]);

        map.flyTo([averageOfRoute.lat, averageOfRoute.lng], 14);
        L.layerGroup([routeline]).addTo(map);

    }, null, {});

}