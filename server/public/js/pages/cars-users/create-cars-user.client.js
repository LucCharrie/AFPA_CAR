var createCarsUserController = {};

(function (self) {
    var form = {
        carId : null,
        color : null,
        numimmat : null
    };

    //
    // Init
    //
    self.init = function () {
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
                form.carId = ui.item.id;
            }
        });

        $('#form-create-car button[type="submit"]').click(function() {
            form.color    = $('#form-create-car select[name="color"]').val();
            form.numimmat = $('#form-create-car input[name="numimmat"]').val();
    
            $.ajax({
                method: 'POST',
                url: '/api/cars-user/me',
                data: {
                    carId: form.carId,
                    color: form.color,
                    numimmat: form.numimmat
                },
                success : function(data) {
                    Kovoit.pushNotification('success', data.success)
                },
                error : function(xhr) {
                    var data = xhr.responseJSON;
                    Kovoit.pushNotification('error', data.errors)
                }
            });
        });
        
    }

    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(createCarsUserController);