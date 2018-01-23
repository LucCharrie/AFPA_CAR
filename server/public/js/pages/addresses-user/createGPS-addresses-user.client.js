var createAddressUserController = {};

(function (self) {
    //
    // Init
    //
    self.init = function () {

        $('#form-create-address button[type="submit"]').click(function() {

            var form = {
                name : $('#form-create-address input[name="name"]').val(),

                number    : $('#form-create-address input[name="number"]').val(),
                rep       : $('#form-create-address input[name="rep"]').val(),
                street    : $('#form-create-address input[name="street"]').val(),
                city      : $('#form-create-address input[name="city"]').val(),
                zip       : $('#form-create-address input[name="zip"]').val(),

                latitude  : $('#form-create-address input[name="latitude"]').val(),
                longitude : $('#form-create-address input[name="longitude"]').val()
            };
            $.ajax({
                method: 'POST',
                url: '/api/addresses-user/createGPS',
                data: {
                    name: form.name,
                    number : form.number,
                    rep: form.rep,
                    street: form.street,
                    city: form.city,
                    zip: form.zip,

                    latitude: form.latitude,
                    longitude: form.longitude
                },
                success : function(data) {
                    window.location.replace('/addresses-user');
                },
                error : function(xhr) {
                    var data = xhr.responseJSON;
                    Kovoit.pushNotification('error', data.errors);
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(createAddressUserController);