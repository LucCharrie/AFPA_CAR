let AddressesUserService = require('../services/addresses-user.service');
let AddressesUserModel = require('../models/addresses-user.model');

/**
 * Create an address for current user
 */
module.exports.create = function(req, res) {
  req.checkBody('address_name', 'Intitulé vide').notEmpty();
  req.checkBody('address', 'Adresse vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.status(500).json({'errors': errorsFields});
  }

  let adressUserModel = new AddressUserModel({
    id: null,
    street: '',
    city: '',
    latitude: '',
    longitude: '',
    numero: '',
    zip_code: '',
    rep: '',
    userRef: {
      id_user: req.session.user.id
    }
  });

  AddressesUserService.create(AddressUserModel, (err, addressUser) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to create car !'}] });
    } else {
      res.json({ 'success': [{msg: 'addressUser Updated !'}], 'addressUser': addressUser });
    }
  });
}

// Create GPS
////////////////////////////////////////
////////////////////////////////////////

module.exports.createGPS = function(req, res) {
  req.checkBody('name', 'Intitulé vide').notEmpty();
  req.checkBody('longitude', 'Longitude vide').notEmpty();
  req.checkBody('latitude', 'Latitude vide').notEmpty();

  let errorsFields = req.validationErrors();

  if (errorsFields) {
    return res.status(500).json({'errors': errorsFields});
  }

  let addressUserModel = new AddressUserModel({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    userRef: {
      id_user: req.session.user.id
    }
  });

  AddressesUserService.createGPS(AddressUserModel, (err, addressUser) => {
    if (err) {
      res.status(500).json({ 'errors': [{msg: 'Failed to create address !'}] });
    } else {
      res.json({ 'success': [{msg: 'addressUser Updated !'}], 'addressUser': addressUser });
    }
  });
}

/**
 * List of current user's addresses
 */
module.exports.list = function(req, res) {
  AddressesUserService.listByUserID(req.session.user.id, (err, addressesUser) => {
    res.json(addressesUser);
  });
}

/**
 * Delete an address of current user
 */
module.exports.delete = function(req, res) {
  AddressUserService.deleteByUserID(req.params.idAddressUser, req.session.user.id, (err) => {
    res.json({ 'success': [{msg: 'addressUser Deleted !'}]});
  });
}