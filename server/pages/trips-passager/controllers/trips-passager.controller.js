/**
 * Index
 */
module.exports.index = function(req, res) {
  res.render('trips-passager/views/index');
};


/**
 * Create
 */
module.exports.create = function(req, res) {
  res.render('trips-passager/views/create');
};