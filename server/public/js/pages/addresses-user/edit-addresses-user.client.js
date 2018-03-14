var createAddressUserController = {};

( function ( self ){
    //
    // Init
    //

    self.getParameter = function (param) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(param).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    self.init = function (){
        
        var id = self.getParameter("id");
        var libelle = self.getParameter("lib");
        $.ajax( {
            url: "/api/addresses-user/edit?id=" + id,
            type: "GET",
            dataType: "json",
            success: function ( data )
            {
                var currentAddress = data[0].address;
                
                $( '[name="libelle"]' ).attr( 'value', libelle );
                $( '[name="numero"]' ).attr( 'value', currentAddress.numero );
                $( '[name="rep"]' ).attr( 'value', currentAddress.rep );
                $( '[name="street"]' ).attr( 'value', currentAddress.street);
                $( '[name="city"]' ).attr( 'value', currentAddress.city );
                $( '[name="zip"]' ).attr( 'value', currentAddress.zip_code );
                $( '[name="latitude"]' ).attr( 'value', currentAddress.latitude );
                $( '[name="longitude"]' ).attr( 'value', currentAddress.longitude );

            }
        } );
    }

      


    $( '#form-create-address button[type="submit"]' ).click( function (){

        $.ajax( {
            method: 'POST',
            url: '/api/addresses-user/edit',
            data: {
                libelle: form.libelle,

                numero: form.numero,
                rep: form.rep,
                street: form.street,
                city: form.city,
                zip_code: form.zip_code,

                latitude: form.latitude,
                longitude: form.longitude
            },
            success: function ( data )
            {
                window.location.replace( '/addresses-user' );
            },
            error: function ( xhr )
            {
                var data = xhr.responseJSON;
                Kovoit.pushNotification( 'error', data.errors );
            }
        } );


        var form = {
            libelle: $( '#form-create-address input[name="libelle"]' ).val(),

            numero: $( '#form-create-address input[name="numero"]' ).val(),
            rep: $( '#form-create-address input[name="rep"]' ).val(),
            street: $( '#form-create-address input[name="street"]' ).val(),
            city: $( '#form-create-address input[name="city"]' ).val(),
            zip_code: $( '#form-create-address input[name="zip_code"]' ).val(),

            latitude: $( '#form-create-address input[name="latitude"]' ).val(),
            longitude: $( '#form-create-address input[name="longitude"]' ).val()
        };
        $.ajax( {
            method: 'POST',
            url: '/api/addresses-user/createGPS',
            data: {
                libelle: form.libelle,

                numero: form.numero,
                rep: form.rep,
                street: form.street,
                city: form.city,
                zip_code: form.zip_code,

                latitude: form.latitude,
                longitude: form.longitude
            },
            success: function ( data )
            {
                window.location.replace( '/addresses-user' );
            },
            error: function ( xhr )
            {
                var data = xhr.responseJSON;
                Kovoit.pushNotification( 'error', data.errors );
            }
        } );
    } );




    ////////////////////////////////////////////////////////////
    //////// ON LOAD ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    window.onload = self.init;
    

}) ( createAddressUserController );