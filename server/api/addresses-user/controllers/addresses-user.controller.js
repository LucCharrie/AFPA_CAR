//=========================================================================
// Le controleur fait le lien entre la vue et le service, il controle la
// validité des entrés utilisateurs, passe le traitement au service puis
// rends la vue (typiquement).
//=========================================================================

let AddressesUsersService = require( '../services/addresses-user.service' );
let AddressUserModel = require( '../models/addresses-user.model' );


/**
 * Create an address for current user
 */
module.exports.create = function ( req, res )
{

  let addressUser = new AddressUserModel( {
    libelle: req.body.libelle,
    userRef: {
      id_user: req.session.user.id
    }
  } );

  req.checkBody( 'libelle', 'Intitulé vide' ).notEmpty();
  req.checkBody( 'libelle', 'Intitulé trop long, 25 caractères maximum' ).isLength({ max : 25});
  req.checkBody( 'address', 'Adresse vide' ).notEmpty();
  

  let errorsFields = req.validationErrors();

  if ( errorsFields )
  {
    return res.status( 500 ).json( { 'errors': errorsFields } );
  }


  AddressesUsersService.create( addressUser, req.body.addressId, ( err ) =>
  {

    if ( err )
    {
      res.status( 500 ).json( { 'errors': [ { msg: 'Intitulé déja utilisé !' }] } );
    } else
    {
      res.json( { 'success': [ { msg: 'addressUser Updated !' }], 'addressUser': addressUser } );
    }
  } );
}

module.exports.createGPS = function ( req, res )
{
  req.checkBody( 'libelle', 'Intitulé vide' ).notEmpty();
  req.checkBody( 'numero', 'Numero incorrect' ).isInt();

  req.checkBody( 'street', 'Rue vide' ).notEmpty();
  req.checkBody( 'city', 'Rue vide' ).notEmpty();
  req.checkBody( 'zip', 'Rue vide' ).notEmpty();
  req.checkBody( 'latitude', 'vide' ).isFloat();
  req.checkBody( 'longitude', 'vide' ).isFloat();

  let errorsFields = req.validationErrors();

  if ( errorsFields )
  {
    return res.status( 500 ).json( { 'errors': errorsFields } );
  }

  let addressUser = new AddressUserModel( {

    libelle: req.body.libelle,
    addressRef: {
      street: req.body.street,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      numero: req.body.numero,
      zip_code: req.body.zip_code,
      rep: req.body.rep,
    },
    userRef: {
      id_user: req.session.user.id
    },
  } );

  AddressesUsersService.createGPS( addressUser, ( err ) =>
  {
    if ( err )
    {
      res.status( 500 ).json( { 'errors': [ { msg: 'Failed to create car !' }] } );
    } else
    {
      res.json( { 'success': [ { msg: 'addressUser Updated !' }], 'addressUser': addressUser } );
    }
  } );
}

/**
 * Read an address
 */
module.exports.read = function ( req, res )
{
  AddressesUsersService.find( req.params.idAddresses - user, ( err, address ) =>
  { // à voir pour utiliser le middleware addressByID
    res.json( address );
  } );
}


/**
 * User middleware
 */
exports.addressesByID = function ( req, res, next, idUser )
{
  if ( isNaN( idUser ) )
  {
    return res.status( 400 ).send( {
      address: 'User is invalid'
    } );
  }

  AddressesUsersService.find( idUser, ( err, address ) =>
  {
    if ( !address )
    {
      return next( new Error( 'Failed to load address ' + idUser ) );
    }

    req.address = address;
    next();
  } );
}