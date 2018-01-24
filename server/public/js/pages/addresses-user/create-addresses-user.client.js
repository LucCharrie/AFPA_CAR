var createAddressUserController = {};

(function (self) {
    //
    // Init
    //
    var my_id;
    self.init = function () {
        $('.addresses_auto').autocomplete({
        
            
            source: function (request, response) {
                
                
                $.ajax({
                    url: '/api/addresses-autocomplete',
                    dataType: 'json',
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        
                        
                        response($.map(data, function (item) {
                            

                            
                            return {
                                'value': item.numero + ' ' +  item.street + ' ' + item.zip_code + ' ' + item.city,
                                'id': item.id
                            };
                        }));
                    }
                });
            },

            minLength: 2,

            select: function (event, ui) {
                $('#form-create-address input[name="address"]').data('id', ui.item.id);
                my_id = ui.item.id;

            }
        });

        $('#form-create-address button[type="submit"]').click(function() {
            
            var form = {
                
                libelle : $('#form-create-address input[name="libelle"]').val(),
                address    : $('#form-create-address input[name="address"]').val()//data("id")
            };
            
            $.ajax({
                method: 'POST',
                url: '/api/addresses-user/create',
                data: {
                    addressId: my_id,
                    libelle: form.libelle,
                    address: form.address
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