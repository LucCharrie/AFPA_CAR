var createTripFavorite = {};

(function (self) {

    ////////////////////////////////////////////////////////////
    //////// TRIP DRIVER ///////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // set center coordinates
    self.centerlat = 43.610769;
    self.centerlon = 3.8767159999999876;

    // set default zoom level
    self.zoomLevel = 10;

    self.coords = [];
    self.markers = [];
    self.group = null;
    self.map = null;
    self.router = null;
    self.self = null;

    var TripOBJ = {
        name: "",
        nb_seats: 0,
        driver: 0,
        car_user_id: 0,
        vias: [],
        address_departure_id: 0,
        address_arrival_id: 0,
        days: []
    }





    ////////////////////////////////////////////////////////////
    //////// INIT MAP  /////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    self.init = function () {
        self.map = L.map('map', {
            zoomControl: true
        }).setView([self.centerlat, self.centerlon], self.zoomLevel);

        self.map.zoomControl.setPosition('topright');

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(self.map);

        self.router = new L.Routing.osrmv1({
            serviceUrl: 'http://10.111.61.255:5000/route/v1'
        });

    };






    ////////////////////////////////////////////////////////////
    //////// AUTOCOMPLETE ADDRESS //////////////////////////////
    ////////////////////////////////////////////////////////////
    // self.ajaxREQ = function () {
    //     $('.address_auto').autocomplete({
    //         source: function (request, response) {
    //             $.ajax({
    //                 url: "/api/addresses-autocomplete",
    //                 dataType: "json",
    //                 data: {
    //                     term: request.term
    //                 },
    //                 success: function (data) {
    //                     response($.map(data, function (item) {
    //                         return {
    //                             "value": item.numero + ', ' + item.street + ', ' + item.city,
    //                             "lat": item.latitude,
    //                             "lng": item.longitude
    //                         };
    //                     }));
    //                 }
    //             })
    //         },
    //         minLength: 2,

    //         // Push les coordonnées gps dans un tableau
    //         select: function (event, ui) {
    //             self.coords.set(this.id, [ui.item.lat, ui.item.lng])
    //         }
    //     });
    // };






    ////////////////////////////////////////////////////////////
    //////// CALCUL TRIP ///////////////////////////////////////
    ////////////////////////////////////////////////////////////
    self.sendCoords = function () {

        // delete old path & markers
        if (self.group !== null) {
            self.map.removeLayer(self.group);

            for (var mark of self.markers) {
                self.map.removeLayer(mark);
            }
            self.markers = [];

        } else { }

        // path from --> to --> to
        var routeWaypoints = [];
        var parentCoords = document.getElementById("parentVia");
        var childCoords = parentCoords.getElementsByTagName('select');

        for (var i = 0; i < parentVia.children.length; ++i) {
            var textCoords = childCoords[i].options[childCoords[i].selectedIndex].text;

            for (var j of self.coords[0]) {
                if (textCoords === j.libelle) {
                    routeWaypoints.push(L.Routing.waypoint(L.latLng(j.address.latitude, j.address.longitude)));
                }
            }
        }

        //zoom to
        var averageOfRoute = {
            lat: (routeWaypoints[0].latLng.lat + routeWaypoints[routeWaypoints.length - 1].latLng.lat) / 2,
            lng: (routeWaypoints[0].latLng.lng + routeWaypoints[routeWaypoints.length - 1].latLng.lng) / 2
        }
        self.map.flyTo([averageOfRoute.lat, averageOfRoute.lng], 10);

        // calcul path and add markers
        self.router.route(routeWaypoints, (err, routes) => {
            var routeline = L.Routing.line(routes[0]);
            self.group = L.layerGroup([routeline]).addTo(self.map);

            //add markers
            for (var markerCoord of routes[0].inputWaypoints) {
                self.markers.push(L.marker([markerCoord.latLng.lat, markerCoord.latLng.lng]).addTo(self.map));
            }

        }, null, {});
    };






    ////////////////////////////////////////////////////////////
    //////// CREATE TRIP ///////////////////////////////////////
    ////////////////////////////////////////////////////////////
    self.createTrip = function () {

        // Nom et Conducteur
        TripOBJ.name = document.getElementsByName("name")[0].value;

        var dr = document.getElementsByName("driver")[0].checked;
        if(dr){
            TripOBJ.driver = 1;
        } else {
            TripOBJ.driver = undefined;
        }

        // If Conducteur == true
        if (dr) {
            var car = document.getElementById("car_user_id")
            TripOBJ.car_user_id = parseInt(car.options[car.selectedIndex].value);
            TripOBJ.nb_seats = parseInt(document.getElementsByName("nb_seats")[0].value);
        } else {
            TripOBJ.nb_seats = undefined;
            TripOBJ.car_user_id = undefined;
        }

        // Jours
        var days = document.querySelectorAll('div.green', 'div.circular', 'div.label');
        for (var day of days) {
            TripOBJ.days.push(day.getAttribute('data-id'));
        }
        TripOBJ.days = JSON.stringify(TripOBJ.days);

        // Addresses
        var departure = document.getElementById("address_departure");
        var arrival = document.getElementById("address_arrival");

        TripOBJ.address_departure_id = parseInt(departure.options[departure.selectedIndex].value);
        TripOBJ.address_arrival_id = parseInt(arrival.options[arrival.selectedIndex].value);

        // Addresses Vias
        var parentVia = document.getElementById("parentVia");
        for (var i = 0; i < parentVia.children.length; ++i) {
            var id = "via_" + i;
            var via = document.getElementById(id);

            if (via) {
                TripOBJ.vias.push(parseInt(via.options[via.selectedIndex].value));
            }
        }
        TripOBJ.vias = JSON.stringify(TripOBJ.vias);



        // Send TripOBJ to Backend
        if (TripOBJ.days.length > 0) {
            $.ajax({
                method: 'POST',
                url: '/api/trip_favorite',
                data: TripOBJ,
                
                success: function (data) {
                    Kovoit.pushNotification('success', data.success)
                },
                error: function (xhr) {
                    var data = xhr.responseJSON;
                    //Kovoit.pushNotification('error', data.errors)
                }
            });
        } else {
            Kovoit.pushNotification('error', TripOBJ.vias);
        }

        window.open('/trips-driver','_self');

        // TripOBJ.days = [];
        // TripOBJ.vias = [];

    }





    ////////////////////////////////////////////////////////////
    //////// INIT OBJECT ONLOAD ////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = function () {
        self.init();
        listCoords.init();
        listAddress.init('#address_departure');
        listAddress.init('#address_arrival');
    }


})(createTripFavorite); 
