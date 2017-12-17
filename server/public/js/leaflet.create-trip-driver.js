// set center coordinates
var centerlat = 45.12;
var centerlon = 1.3;

// set default zoom level
var zoomLevel = 11; 

var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

var addressDeparture = new kt.OsmNamesAutocomplete('address_departure', 'https://geocoder.tilehosting.com/', '6rPEQkYgGnRM5zeh6ifT');
var addressArrival = new kt.OsmNamesAutocomplete('address_arrival', 'https://geocoder.tilehosting.com/', '6rPEQkYgGnRM5zeh6ifT');

var path = new Array(2);

addressDeparture.registerCallback(function(item) {
    path[0] = L.latLng(item.lat, item.lon);
});

addressArrival.registerCallback(function(item) {
    path[path.length] = L.latLng(item.lat, item.lon);
});

//var r = new L.Routing.OSRMv1({serviceUrl: 'https://router.project-osrm.org/route/v1/'});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var control = L.Routing.control({
    //router: r, // http://10.111.61.7:5000/route/v1

    routeWhileDragging: true
}).addTo(map);

var r = control.getRouter();

r.route({
    waypoints: [
        L.latLng(45.12755999999999,1.305565999999999),
        L.latLng(45.159555,1.5339370000000372)
    ]}, function(err, routes) {
        console.log(err);
        console.log('recalc');
}, map);

//L.Routing.Control().getRouter();

// reverse geoCoding
// http://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json&polygon=1&addressdetails=1