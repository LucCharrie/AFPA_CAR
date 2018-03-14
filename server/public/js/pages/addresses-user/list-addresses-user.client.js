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

    self.addressUserDeleteCard = function(my_id, my_libelle) {
        var my_data =  "delete?id=" + my_id + "&" + "lib=" + my_libelle;
        $.ajax({
            url: "/api/addresses-user/" + my_data,
            type: 'DELETE',
            dataType: "json",
                       
           
            success: function (data) {
                
                $( ".card[data-id='" + my_id + "~~" + my_libelle + "']" ).remove();
                Kovoit.pushNotification('success', data.success);
            }
        });
    }

    self.addressUserEditCard = function(my_id, my_libelle) {
        // self.addressUserDeleteCard(my_id, my_libelle);

        location.replace('/addresses-user/edit?id=' + my_id + "&lib=" + my_libelle );
    }

    self.addressUserBuildCard = function(addressUser) {
        var myAddress =  (addressUser.address.numero == null)? '' : ' ' + addressUser.address.numero;
        myAddress += (addressUser.address.rep == null)? '' : ' ' + addressUser.address.rep;
        myAddress += (addressUser.address.street == null)? '' : ' ' + addressUser.address.street;
        myAddress = (myAddress.length > 34)? myAddress.slice(0,34) + "..." : myAddress;
        var card =
        "<div class='card card-trip-driver' data-id='" + addressUser.address.id + "~~" + addressUser.libelle + "'>" +
            "<div class='content'>" +
                "<div class='header'>" + addressUser.libelle + "</div>" +
            "</div>" +
            "<div class='content-body'>" +
                "<table class='ui celled table table-info'>" +
                    "<tbody>" +
                    "<tr>" +
                        "<td>" + myAddress + "<br>"
                          + addressUser.address.zip_code + " " + addressUser.address.city + "</td>" +
                    "</tr>" +
                 "</table>" +
            "</div>" +
            "<div class='extra content'>" +
                "<div class='ui basic blue button' onclick='listAddressUserController.addressUserEditCard(" +
                addressUser.address.id + ",\"" + addressUser.libelle + "\")'> Editer</div>" +
                "<div class='ui basic red button' onclick='listAddressUserController.addressUserDeleteCard(" +
                 addressUser.address.id + ",\"" + addressUser.libelle + "\")'> Supprimer</div>" +
                // "<div class='ui basic red button' onclick=''> Supprimer</div>" +
            "</div>" +
        "</div>" + "<br>";

        
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