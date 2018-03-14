var createAddressUserController = {};

(function (self) {
    //
    // Init
    //
    self.init = function () {

        $('#form-create-address button[type="submit"]').click(function() {

            var form = {
                libelle : $('#form-create-address input[name="libelle"]').val(),

                numero    : $('#form-create-address input[name="numero"]').val(),
                rep       : $('#form-create-address input[name="rep"]').val(),
                street    : $('#form-create-address input[name="street"]').val(),
                city      : $('#form-create-address input[name="city"]').val(),
                zip_code  : $('#form-create-address input[name="zip_code"]').val(),

                latitude  : $('#form-create-address input[name="latitude"]').val(),
                longitude : $('#form-create-address input[name="longitude"]').val()
            };
            $.ajax({
                method: 'POST',
                url: '/api/addresses-user/createGPS',
                data: {
                    libelle: form.libelle,

                    numero : form.numero,
                    rep: form.rep,
                    street: form.street,
                    city: form.city,
                    zip_code: form.zip_code,

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