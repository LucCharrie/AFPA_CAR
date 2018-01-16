/**
 * Index
 */
module.exports.index = function(req, res) {
  //console.log(req)
  res.render('trips-driver/views/index', {trips : req});

};


/**
 * Create
 */
module.exports.create = function(req, res) {
  res.render('trips-driver/views/create');
};