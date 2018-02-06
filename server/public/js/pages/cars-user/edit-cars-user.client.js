var editCarsUserController = {};

(function (self) {
    //
    // Init
    //
    self.init = function () {
        $('.car_auto').autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '/api/cars',
                    dataType: 'json',
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                'value': item.brand.brand_name + ' ' + item.model_name,
                                'id': item.id
                            };
                        }));
                    }
                });
            },

            minLength: 2,

            select: function (event, ui) {
                // l'id du form | le nom de l'input | l'attribut data-id (Cf. data-id='#{carUser.car.id}' ) 
                $('#form-edit-car input[name="car"]').data('id', ui.item.id);
            }
        });

        $('#form-edit-car button[type="submit"]').click(function() {
            var form = {
                color    : $('#form-edit-car select[name="color"]').val(),
                numimmat : $('#form-edit-car input[name="numimmat"]').val(),
                carId    : $('#form-edit-car input[name="car"]').data('id')
            };
console.log('test');
            $.ajax({
                method: 'PUT',
                url: '/api/cars-user/' + $('#form-edit-car').data('id'),
                data: {
                    carId: form.carId,
                    color: form.color,
                    numimmat: form.numimmat
                },
                success : function(data) {
                    window.location.replace('/cars-user');
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
    

})(editCarsUserController);