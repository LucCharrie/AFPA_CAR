var listCarsUserController = {};

(function (self) {
    //
    // Init
    //
    self.init = function () {
        $.ajax({
            url: '/api/cars-user/me',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                self.carsUserListSuccess(data);
            }
        });
    }

    self.carsUserListSuccess = function(carsUser) {
        $.each(carsUser, function (index, carUser) {
          self.carUserAddCard(carUser);
        });
    }

    self.carUserAddCard = function(carUser) {
         $('.ui.cards').append(self.carUserBuildCard(carUser));
    }

    self.carUserDeleteCard = function(id) {
        $.ajax({
            url: '/api/cars-user/' + id,
            type: 'DELETE',
            dataType: 'json',
            success: function (data) {
                $('.card[data-id=' + id + ']').remove();
                Kovoit.pushNotification('success', data.success);
            }
        });
    }

    self.carUserBuildCard = function(carUser) {
        var card =
        "<div class='card card-trip-driver' data-id='" + carUser.id + "'>" +
            "<div class='content'>" +
                "<div class='header'> " +  carUser.car.brand.brand_name + " " + carUser.car.model_name + " </div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        "<td> Couleur :</td>" +
                        "<td>" + carUser.color + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Immatriculation :</td>" +
                        "<td>" + carUser.numimmat + "</td>" +
                    "</tr>" +
                "</table>" +
            "</div>" +
            "<div class='extra content'>" +
                "<a href='/cars-user/edit/" + carUser.id + "' class='ui basic blue button'> Editer</a>" +
                "<a class='ui basic red button' onclick='listCarsUserController.carUserDeleteCard(" + carUser.id + ")'> Supprimer</a>" +
            "</div>" +
        "</div>";
        
        return card;
    }


    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(listCarsUserController);