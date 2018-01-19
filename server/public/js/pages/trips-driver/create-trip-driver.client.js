var createTripDriver = {};

(function (self) {

    ////////////////////////////////////////////////////////////
    //////// TRIP DRIVER ///////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // set center coordinates
    self.centerlat = 43.610769;
    self.centerlon = 3.8767159999999876;

    // set default zoom level
    self.zoomLevel = 10;

    // var global
    self.coords = new Map();
    self.markers = [];
    self.group = null;
    self.inc = 0;
    self.map = null;
    self.router = null;
    self.self = null;

    var form = {};

    //
    // Init
    //
    self.init = function () {
        self.map = L.map('map').setView([self.centerlat, self.centerlon], self.zoomLevel);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(self.map);

        self.router = new L.Routing.osrmv1({
            serviceUrl: 'http://10.111.62.65:5000/route/v1'
        });
    };

    //
    // Ajax
    //
    self.ajaxREQ = function () {
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
                })
            },
            minLength: 2,

            // Push les coordonnées gps dans un tableau
            select: function (event, ui) {
                self.coords.set(this.id, [ui.item.lat, ui.item.lng])
            }
        });

    };


    //
    // Bouton Rechercher
    //
    self.sendCoords = function () {

        var routeWaypoints = [];

        function sortWayPoints() {
            var addressList = document.getElementById('parentVia');
            var addressListChild = addressList.getElementsByTagName('input');

            for (var i = 0; i < addressList.children.length; ++i) {
                for (var values of self.coords) {
                    if (addressListChild[i].id === values[0]) {
                        routeWaypoints.push(L.Routing.waypoint(L.latLng(values[1][0], values[1][1])));
                    }
                }
            }
        }



        // delete old path & markers
        if (self.group !== null) {
            self.map.removeLayer(self.group);

            for (var mark of self.markers) {
                self.map.removeLayer(mark);
            }
            self.markers = [];

        } else { }


        // path from --> to --> to
        sortWayPoints();

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


    //
    // Boutons ajouter via
    //
    self.viaMore = function () {


        var id = 'via_' + self.inc++;

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
        viaButton.setAttribute('onclick', 'createTripDriver.viaLess(this)');
        viaButton.textContent = 'X';

        viaDiv.appendChild(viaInput);
        viaDiv.appendChild(viaButton);
        viaList.appendChild(viaDiv)


        var viaEnd = document.getElementById("viaEnd");
        document.getElementById("parentVia").insertBefore(viaList, viaEnd);

        self.ajaxREQ();

    };


    //
    // Boutons supprimer via
    //
    self.viaLess = function (e) {
        e.parentNode.parentNode.remove();
    };


    ////////////////////////////////////////////////////////////
    //////// CAR DRIVER ////////////////////////////////////////
    ////////////////////////////////////////////////////////////


    self.initCars = function () {
        $('.car_auto').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/api/cars",
                    dataType: "json",
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                "value": item.brand.brand_name + ' ' + item.model_name,
                                "id": item.id
                            };
                        }));
                    }
                });
            },

            minLength: 2,

            select: function (event, ui) {
                console.log(ui.item.id);
            }
        });
    }

    ////////////////////////////////////////////////////////////
    //////// CREATE TRIP ///////////////////////////////////////
    ////////////////////////////////////////////////////////////

    self.createTrip = function () {
            form.name = $('#name_trip[name="name"]').val();
            form.car_user = $('#car_user[name="car_user"]').val();
            form.nb_seats = $('#nb_seats[name="nb_seats"]').val();
            form.address_departure = $('#address_departure[name="address_departure"]').val();
            form.address_arrival = $('#address_arrival[name="address_arrival"]').val();

            $.ajax({
                method: 'POST',
                url: '/api/trip_favorite',
                data: {
                    name: form.name,
                    car_user: form.car_user,
                    nb_seats: form.nb_seats,
                    address_departure: form.address_departure,
                    address_arrival: form.address_arrival
                },
                success: function (data) {
                    //Kovoit.pushNotification('success', data.success)
                },
                error: function (xhr) {
                    var data = xhr.responseJSON;
                    //Kovoit.pushNotification('error', data.errors)
                }
            });
    }


    ////////////////////////////////////////////////////////////
    //////// INIT FUNCTION ON LOAD /////////////////////////////
    ////////////////////////////////////////////////////////////

    window.onload = function () {
        self.init();
        self.ajaxREQ();
        self.initCars();
        //self.createTrip();
    }


})(createTripDriver); 
