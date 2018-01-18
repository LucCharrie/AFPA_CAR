var createCarsUserController = {};

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
                $('#form-create-car input[name="car"]').data('id', ui.item.id);
            }
        });

        $('#form-create-car button[type="submit"]').click(function() {
            var form = {
                color    : $('#form-create-car select[name="color"]').val(),
                numimmat : $('#form-create-car input[name="numimmat"]').val(),
                carId    : $('#form-create-car input[name="car"]').data("id")
            };
        
            $.ajax({
                method: 'POST',
                url: '/api/cars-user/',
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
    

})(createCarsUserController);