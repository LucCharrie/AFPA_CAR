var createAddressesUserController = {};

(function (self) {

    //
    // Init
    //
    self.init = function () {
        $('.addresses_auto').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/api/addresses-autocomplete",
                    dataType: "json",
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                "value": item.numero + ' ' + item.rep + ' ' + item.street + ' ' + item.city + ' ' + item.zip_code,
                                "id": item.id
                            };
                        }));
                    }
                });
            },

            minLength: 2,

            select: function (event, ui) {
                form.addressId = ui.item.id;
                $('#form-create-address input[name="name"]').val(),
            }
        });

        $('#form-create-address button[type="submit"]').click(function() {
            var form = {
                name : $('#form-create-address input[name="name"]').val(),
                addressId : $('#form-create-address input[name="addressId"]').val(),
                street : $('#form-create-address input[name="street"]').val(),
                city : $('#form-create-address input[name="city"]').val(),
                latitude : $('#form-create-address input[name="latitude"]').val(),
                longitude : $('#form-create-address input[name="longitude"]').val(),
                zip_code : $('#form-create-address input[name="zip_code"]').val(),
                numero : $('#form-create-address input[name="numero"]').val(),
                rep : $('#form-create-address input[name="rep"]').val()
                };
            $.ajax({
                method: 'POST',
                url: '/api/addresses-user/me',
                data: {
                    name : form.name,
                    addressId : form.addressId,
                    street : form.street,
                    city : form.city,
                    latitude : form.latitude,
                    longitude : form.longitude,
                    zip_code : form.zip_code,
                    numero : form.numero,
                    rep : form.rep
                },
                success : function(data) {
                    window.location.replace('/addresses-user');
                    console.log(form.addressId);
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
    

})(createAddressesUserController);