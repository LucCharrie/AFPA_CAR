//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

let db = require( __base + 'config/db' )

let AddressesUserModel = require( '../models/addresses-user.model' );

class AddressesUserDAO
{
    static create( addressUser, idAuto, cb )
    {
        
        db.query( 'Call _PS_add_adress_from_autocomplete(?,?,?)',
            [ idAuto, addressUser.user.id, addressUser.libelle ], ( err ) =>
            {
                cb( err );
            } );
    }

    static createGPS( addressUser, cb )
    {
        console.log("createGPS");
        console.log( addressUser.libelle );
        console.log( addressUser );

        db.query('Call _PS_update_user_address_v2(?,?,?,?,?,?,?,?,?)',
        [addressUser.user.id, addressUser.libelle, addressUser.address.numero, addressUser.address.street, addressUser.address.zip_code, addressUser.address.rep, addressUser.address.city, addressUser.address.latitude, addressUser.address.longitude], (err) => {
            cb(err);
        });
        ( err ) =>
            {
                cb( err );
            };
    }

    static listByUserID( idUser, cb )
    {
        db.query( `SELECT ua.user_id,
                    ua.address_id,
                    ua.date_suppression,
                    ua.libelle,
                    a.street,
                    a.city,
                    a.latitude,
                    a.longitude,
                    a.zip_code,
                    a.numero,
                    a.rep
                FROM user_address AS ua
                LEFT JOIN address AS a ON a.id_address = ua.address_id
                WHERE ua.date_suppression IS NULL AND 
                ua.user_id =  ? ;`, [ idUser ], ( err, rows ) =>
            {
                rows = rows || [];

                cb( err, rows.map( ( row ) =>
                {

                    return new AddressesUserModel( {
                        userRef: {
                            id_user: row.user_id
                        },

                        addressRef: {
                            id: row.address_id,
                            street: row.street,
                            city: row.city,
                            latitude: row.latitude,
                            longitude: row.longitude,
                            zip_code: row.zip_code,
                            numero: row.numero,
                            rep: row.rep
                        },

                        libelle: row.libelle

                    } );

                } ) );
            } );
    }


    // static update( addressUser, cb )
    // {
    //     console.log( addressUser.user.id );
    //     console.log( addressUser.libelle );
    //     db.query('Call _PS_update_user_address (?,?,?)',
    //     [ addressUser.user.id, addressUser.address_id, addressUser.libelle], (err) => {
    //         cb(err);
    //     });
    // }

    static delete( addressUser, cb )
    {
        console.log("DELETE");
        db.query(`UPDATE afpa_car_test.user_address
        SET date_suppression = DATE(NOW())
        WHERE 	user_id = ?
            AND address_id = ?
            AND libelle = ?
            AND date_suppression IS NULL;`,
        [ addressUser.user.id, addressUser.address.id, addressUser.libelle], (err) => {
            cb(err);
        });
    }

}
module.exports = AddressesUserDAO;