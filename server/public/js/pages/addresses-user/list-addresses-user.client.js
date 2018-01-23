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
            }
        });
    }

    self.addressesUserListSuccess = function(addressesUser) {     
        $.each(addressesUser, function (index, addressUserOnly) {
          self.addressUserAddCard(addressUserOnly);
        });
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

    self.addressUserBuildCard = function(addressUser) {
        var card =
        "<div class='card card-trip-driver' data-id='" + addressUser.address.id + "'>" +
            "<div class='content'>" +
                "<div class='header'>" + addressUser.libelle + "</div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        // "<td> Adresse : </td>" +
                        "<td>" + addressUser.address.numero +
                        (addressUser.address.rep = null)? " " : (" " + addressUser.address.rep + " ") + addressUser.address.street +
                         " <br> " + addressUser.address.city + " " + addressUser.address.zip_code + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Nom : </td>" +
                        "<td>" + addressUser.address.latitude + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Adresse : </td>" +
                        "<td>" + addressUser.address.longitude + "</td>" +
                    "</tr>" +
                 "</table>" +
            "</div>" +
            "<div class='extra content'>" +
                "<div class='ui basic blue button'> Editer</div>" +
                // "<div class='ui basic red button' onclick='listaddressUserController.addressUserDeleteCard(" + id + ")'> Supprimer</div>" +
                "<div class='ui basic red button' onclick=''> Supprimer</div>" +
            "</div>" +
        "</div>" + "<br>";;
        
        return card;
      }


    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(listAddressUserController);

/*
//var listAddressUserController = {};

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
            }
        });
    }

    self.addressesUserListSuccess = function(addressesUser) {     
        $.each(addressesUser, function (index, addressUserOnly) {
          self.addressUserAddCard(addressUserOnly);
        });
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

    self.addressUserBuildCard = function(addressUser) {
        var card =
        "<div class='card card-trip-driver' data-id='" + addressUser.address.id + "'>" +
            "<div class='content'>" +
                "<div class='header'>" + addressUser.libelle + "</div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        // "<td> Adresse : </td>" +
                        "<td>" + addressUser.address.numero + " " + addressUser.address.rep + " " + addressUser.address.street +
                         " <br> " + addressUser.address.city + " " + addressUser.address.zip_code + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Nom : </td>" +
                        "<td>" + addressUser.address.latitude + "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td> Adresse : </td>" +
                        "<td>" + addressUser.address.longitude + "</td>" +
                    "</tr>" +
                 "</table>" +
            "</div>" +
            "<div class='extra content'>" +
                "<div class='ui basic blue button'> Editer</div>" +
                // "<div class='ui basic red button' onclick='listaddressUserController.addressUserDeleteCard(" + id + ")'> Supprimer</div>" +
                "<div class='ui basic red button' onclick=''> Supprimer</div>" +
            "</div>" +
        "</div>";
        
        return card;
      }


    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

})(listAddressUserController);*/