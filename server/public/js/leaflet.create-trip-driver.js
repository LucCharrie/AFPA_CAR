// set center coordinates
var centerlat = 45.12;
var centerlon = 1.3;

// set default zoom level
var zoomLevel = 11; 



var addressDeparture = new kt.OsmNamesAutocomplete('address_departure', 'https://geocoder.tilehosting.com/', '6rPEQkYgGnRM5zeh6ifT');
var addressArrival = new kt.OsmNamesAutocomplete('address_arrival', 'https://geocoder.tilehosting.com/', '6rPEQkYgGnRM5zeh6ifT');

var path = new Array(2);

addressDeparture.registerCallback(function(item) {
    path[0] = L.latLng(item.lat, item.lon);
});

addressArrival.registerCallback(function(item) {
    path[path.length] = L.latLng(item.lat, item.lon);
});

var map = L.map('map').setView([centerlat, centerlon], zoomLevel);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('mousemove', function (e) {
            document.getElementById('info').innerHTML =
                // e.point is the x, y coordinates of the mousemove event relative
                // to the top-left corner of the map
                JSON.stringify(e.layerPoint) + '<br />' +
                // e.lngLat is the longitude, latitude geographical position of the event
                JSON.stringify(e.latlng);
        });



        //////
        ////// Checkpoint
        //////
        // for (var i = 0; i < 10; ++i) {
        //     var j = i / 100000;
        //     var gpslt = 43.29648 + j;
        //     L.marker([gpslt, 5.469779999999992], { opacity: 0.8, riseOnHover: true }).addTo(map)
        //         .bindPopup('MY ADRESSSS.' + i)
        //         .openPopup();
        // }



        // L.Routing.control({
        //     serviceUrl: 'http://10.111.61.7:5000/route/v1',

        //     waypoints: [
        //         L.latLng(43.296482, 5.369779999999992),
        //         L.latLng(43.173653, 5.605154999999968)
        //     ],
        //     routeWhileDragging: true,

        //     // rentrer les adresses
        //     geocoder: L.Control.Geocoder.nominatim()

        // }).addTo(control);



        var router = new L.Routing.osrmv1({
            serviceUrl: 'http://10.111.61.97:5000/route/v1'
        });

        // var route1waypoints = [
        //     L.Routing.waypoint(L.latLng(43.296482, 5.369779999999992)),
        //     L.Routing.waypoint(L.latLng(43.173653, 5.605154999999968))
        // ];
        // var route1plan = L.Routing.plan(route1waypoints);


        // var route2waypoints = [
        //     L.Routing.waypoint(L.latLng(43.373653, 5.405154999999968)),
        //     L.Routing.waypoint(L.latLng(43.373653, 5.355154999999968)),
        //     L.Routing.waypoint(L.latLng(43.373653, 5.305154999999968))
        // ], route2plan = L.Routing.plan(route2waypoints);

        var maxlat = 45.30
        var minlat = 45.28
        var maxlng = 1.37
        var minlng = 1.40
        console.log(Math.random() * (maxlat - minlat) + minlat)
        var nbPath = 100;
        var arrRoutes = [];
        var arrMarkers = [];


        // for (var inc = 0; inc < nbPath; ++inc) {
        //     var routeWaypoints = [
        //         L.Routing.waypoint(L.latLng(Math.random() * (maxlat - minlat) + minlat, Math.random() * (maxlng - minlng) + minlng)),
        //         L.Routing.waypoint(L.latLng(Math.random() * (maxlat - minlat) + minlat, Math.random() * (maxlng - minlng) + minlng))
        //     ];
        //     var routePlan = L.Routing.plan(routeWaypoints);

        //     arrRoutes.push(routeWaypoints);
        //     arrMarkers.push(routePlan);
        // }

        // router.route(route1waypoints, (err, routes) => {
        //     var route1line = L.Routing.line(routes[0]);
        //     console.log(routes)
        //     L.layerGroup([route1plan, route1line]).addTo(map);
        // }, null, {});


        // router.route(route2waypoints, (err, routes) => {
        //     var route2line = L.Routing.line(routes[0]);
        //     L.layerGroup([route2plan, route2line]).addTo(map);
        // }, null, {});



        // for (var i = 0; i < arrRoutes.length; ++i) {

        //     router.route(arrRoutes[i], (err, routes) => {

        //         var routeline = L.Routing.line(routes[0]);
        //         var routemarker = arrMarkers[i];
        //         console.log( " route marker : " + L.Routing.waypoint() );
        //         L.layerGroup([routeline]).addTo(map);
                
        //     }, null, {});
        // }

///////////////////////////////////////////////////////////////////////////////////




        //////
        ////// Button popup on map
        //////
        // function createButton(label, container) {
        //     var btn = L.DomUtil.create('button', '', container);
        //     btn.setAttribute('type', 'button');
        //     btn.innerHTML = label;
        //     return btn;
        // }

        // map.on('click', function (e) {
        //     var container = L.DomUtil.create('div'),
        //         startBtn = createButton('Starting Point', container),
        //         pointBtn = createButton('Create CheckPoint', container),
        //         destBtn = createButton('Ending Point', container);

        //     L.popup()
        //         .setContent(container)
        //         .setLatLng(e.latlng)
        //         .openOn(map);
        // });

        // L.DomEvent.on(startBtn, 'click', function () {
        //     control.spliceWaypoints(0, 1, e.latlng);
        //     map1.closePopup();
        // });

        // L.DomEvent.on(destBtn, 'click', function () {
        //     control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        //     map1.closePopup();
        // });


var arrRoutes = [];

arrRoutes.push([
    L.Routing.waypoint(L.latLng(45.148869, 1.2290500000000293)),
    L.Routing.waypoint(L.latLng(45.12755999999999, 1.305565999999999))
]);

arrRoutes.push([
    L.Routing.waypoint(L.latLng(45.168869, 1.2290500000000293)),
    L.Routing.waypoint(L.latLng(45.12755999999999, 1.305565999999999))
]);

for (var i = 0; i < 2; i++) {
    router.route(arrRoutes[i], (err, route) => {
        var routeline = L.Routing.line(route[0]);
        L.layerGroup([routeline]).addTo(map);
        
    }, null, {});
}