var listAddressUserController = {};

(function (self) {


    //
    // Init
    //
    self.init = function () {
        $.ajax({
            url: "/api/addresses-user/me",
            type: "GET",
            dataType: "json",
            success: function (data) {
                self.addressesUserListSuccess(data);
                console.log(data);
            }
        });
    }

    self.addressesUserListSuccess = function(addressesUser) {
        
        // $.each(addressesUser, function (index, addressUserOnly) {
        // console.log(addressUserOnly.libelle); 
        //   self.addressUserAddCard(addressUserOnly);
        // });
    }

    self.addressUserAddCard = function(addressUserOnly) {
         $(".ui.cards").append(self.addressUserBuildCard(addressUserOnly));
    }

    self.addressUserDeleteCard = function(id) {
        $.ajax({
            url: "/api/addresses-user/me/" + id,
            type: 'DELETE',
            dataType: "json",
            success: function (data) {
                $('.card[data-id=' + id + ']').remove();
                Kovoit.pushNotification('success', data.success);
            }
        });
    }

    self.addressUserBuildCard = function(addressUserOnly) {
        var card =
        "<div class='card card-trip-driver' data-id='" + id_user + "'>" +
            "<div class='content'>" +
                "<div class='header'> Ma voiture </div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        "<td> Marque : </td>" +
                        "<td>" + addressUser.address.brand.brand_name + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Modèle : </td>" +
                        "<td>" + addressUser.address.model_name + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Couleur :</td>" +
                        "<td>" + addressUser.color + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Immatriculation :</td>" +
                        "<td>" + addressUser.numimmat + "</td>" +
                    "</tr>" +
                "</table>" +
            "</div>" +
            "<div class='extra content'>" +
                "<div class='ui basic blue button'> Editer</div>" +
                "<div class='ui basic red button' onclick='listaddressUserController.addressUserDeleteCard(" + id + ")'> Supprimer</div>" +
            "</div>" +
        "</div>";
        
        return card;
      }


    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(listAddressUserController);