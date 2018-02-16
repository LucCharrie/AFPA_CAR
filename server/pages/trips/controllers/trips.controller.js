/**
 * Index
 */
module.exports.index = function(req, res) {
  res.render('trips/views/index');
};


/**
 * Edit
 */
module.exports.edit = function(req, res) {
  res.render('trips/views/edit');
};