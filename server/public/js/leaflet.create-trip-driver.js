// set center coordinates
var centerlat = 43.30;
var centerlon = 5.36;

// set default zoom level
var zoomLevel = 10;

var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

$('#address_departure').autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "/api/address",
            dataType: "json",
            data: {
                term: request.term
            },
            success: function(data) {
                response($.map(data, function(item) {
                    return item.num + ' ' + item.name + ', ' + item.city;
                }));
            },
            select: function(event, ui) {
                console.log("Selected: " + ui.item.city);
            }
        });
    },
    minLength: 2
});


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var router = new L.Routing.osrmv1({
    serviceUrl: 'http://10.111.61.97:5000/route/v1'
});

var routeWaypoints = [
    L.Routing.waypoint(L.latLng(43.30, 5.37)),
    L.Routing.waypoint(L.latLng(43.30, 5.40))
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