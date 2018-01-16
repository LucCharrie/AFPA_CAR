var listCarsUserController = {};

(function (self) {


    //
    // Init
    //
    self.init = function () {
        $.ajax({
            url: "/api/cars-user/me",
            type: "GET",
            dataType: "json",
            success: function (data) {
                self.carsUserListSuccess(data);
            }
        });
    }

    self.carsUserListSuccess = function(carsUser) {
        $.each(carsUser, function (index, carUser) {
          self.carUserAddCard(carUser.id, carUser);
        });
    }

    self.carUserAddCard = function(id, carUser) {
         $(".ui.cards").append(self.carUserBuildCard(id, carUser));
    }

    self.carUserDeleteCard = function(id) {
        $.ajax({
            url: "/api/cars-user/me/" + id,
            type: 'DELETE',
            dataType: "json",
            success: function (data) {
                $('.card[data-id=' + id + ']').remove();
                Kovoit.pushNotification('success', data.success);
            }
        });
    }

    self.carUserBuildCard = function(id, carUser) {
        var card =
        "<div class='card card-trip-driver' data-id='" + id + "'>" +
            "<div class='content'>" +
                "<div class='header'> Ma voiture </div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        "<td> Marque : </td>" +
                        "<td>" + carUser.car.brand.brand_name + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Modèle : </td>" +
                        "<td>" + carUser.car.model_name + "</td>" +
                    "</tr>" +
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
                "<div class='ui basic blue button'> Editer</div>" +
                "<div class='ui basic red button' onclick='listCarsUserController.carUserDeleteCard(" + id + ")'> Supprimer</div>" +
            "</div>" +
        "</div>";
        
        return card;
      }


    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(listCarsUserController);