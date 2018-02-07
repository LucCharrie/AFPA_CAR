let AddressesUserService = require( '../services/addresses-user.service' );
let AddressUserModel = require( '../models/addresses-user.model' );



// Create GPS
////////////////////////////////////////
////////////////////////////////////////

module.exports.createGPS = function ( req, res )
{
  req.checkBody( 'address_name', 'Intitulé vide' ).notEmpty();
  req.checkBody( 'number', 'Adresse vide' ).isEmail();
  req.checkBody( 'latitude', 'Latitude incorrect' ).islatLong(lat);
  req.checkBody( 'longitude', 'Longitude incorrect' ).islatLong(long);

  let errorsFields = req.validationErrors();

  if ( errorsFields )
  {
    return res.status( 500 ).json( { 'errors': errorsFields } );
  }

  let addressUser = new AddressUserModel( {

    libelle: req.body.libelle,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    userRef: {
      id_user: req.session.user.id
    }
  } );

  AddressesUserService.createGPS( AddressUserModel, ( err, addressUser ) =>
  {
    if ( err )
    {
      res.status( 500 ).json( { 'errors': [ { msg: 'Intitulé déja utilisé' }] } );
    } else
    {
      res.json( { 'success': [ { msg: 'addressUser Updated !' }], 'addressUser': addressUser } );
    }
  } );
}

/**
 * List of current user's addresses
 */
module.exports.list = function ( req, res )
{
  AddressesUserService.listByUserID( req.session.user.id, ( err, addressesUser ) =>
  {
    res.json( addressesUser );
  } );
}

module.exports.parseData = function ( req, res, next, data )
{
  //?ID&lib --- query(...)
  var my_data = data.split( "~~" );
  if ( my_data[ 0 ].match( /[0-9]/ ) && my_data.length == 2 )
  {
    req.idAddress = my_data[ 0 ];
    req.libelle = my_data[ 1 ];
  }
  else
  {
 
    return res.status( 500 ).json( { 'errors': [ { msg: 'Error request delete' }] } );
  }
  // console.log(my_data[0]);
  // console.log(req.libelle);
  next();
}


/**
 * Update an address of current user
 */
// module.exports.update = function ( req, res )
// {

//   let addressUser = new AddressUserModel( {

//     libelle: req.libelle,
//     userRef: {
//       id_user: req.session.user.id
//     },
//     addressRef: {
//       id: req.idAddress
//     }
    
//   } );

//   AddressesUserService.update( addressUser, ( err ) =>
//   {
//     console.log(addressUser);
//     if ( err )
//     {
//       console.log(45);
//       res.status( 500 ).json( { 'errors': [ { msg: 'L\'addresse n\'a pas pu être modifiée !' }] } );
//     }
//     else
//     {
//       console.log(46);
//       res.json( { 'success': [ { msg: 'Adresse modifiée !' }] } );
//     }
//     console.log(47);
//   } );
// }


/**
 * Delete an address of current user
 */
module.exports.delete = function ( req, res )
{

  let addressUser = new AddressUserModel( {

    libelle: req.libelle,
    userRef: {
      id_user: req.session.user.id
    },
    addressRef: {
      id: req.idAddress
    }
    
  } );

  AddressesUserService.delete( addressUser, ( err ) =>
  {
    if ( err )
    {
      res.status( 500 ).json( { 'errors': [ { msg: 'L\'adresse n\'a pas pu être supprimée !' }] } );
    }
    else
    {
      res.json( { 'success': [ { msg: 'Adresse supprimée !' }] } );
    }
  } );
}