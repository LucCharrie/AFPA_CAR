/**
 * Index
 */
module.exports.index = function(req, res) {
  res.render('trips-driver/views/index');
};


/**
 * Create
 */
module.exports.create = function(req, res) {
  res.render('trips-driver/views/create');
};