var editTripCtrl = {};


(function (self) {

    self.put = function(trip){
        let Trip = {
            id_trip: 0,
            nb_seats: 0,
            hours_departure: 0,
            hours_arrival: 0
        };
        let idTrip = document.getElementById(trip).getAttribute('data-id');
        let form = document.getElementById(trip).elements;
        // let arr = [];
        // for (let i = 0; i< form.length; ++i){
        //     arr.push(form[i].value);
        // }

        Trip.id_trip = idTrip;
        Trip.nb_seats = form[0].value;
        Trip.hours_departure = form[1].value;
        Trip.hours_arrival = form[2].value;
       
        console.log(form)
        console.log(form[0].value)


        $.ajax({
            method: 'POST',
            url: '/api/trip/'+ idTrip,
            data: Trip,

            success: function (data) {
                console.log("Data ", data, " send");
            },
            error: function (xhr) {
                console.log("Error with ", xhr);
            }
        });

        // window.open('/trips', '_self');

    }


})(editTripCtrl);