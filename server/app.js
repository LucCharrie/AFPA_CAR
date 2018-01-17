var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();


// set global variable for root directory
global.__base = __dirname + '/';


// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'pages'));

app.locals.basedir = path.join(__dirname, 'pages');


// middlewares
app.use(logger('dev'));
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// api routes
app.use('/api/address', require('./api/address/routes/address.route'));
app.use('/api/cars', require('./api/cars/routes/cars.route'));
app.use('/api/cars-user', require('./api/cars-user/routes/cars-user.route'));
app.use('/api/users', require('./api/users/routes/users.route'));
app.use('/api/cars-brands', require('./api/cars-brands/routes/cars-brands.route'));
app.use('/api/trip_favorite', require('./api/trip_favorite/routes/trip_favorite.route'));
app.use('/api/trip', require('./api/trip/routes/trip.route'));
app.use('/api/addresses-user', require('./api/addresses-user/routes/addresses-user.route'));


// pages routes
app.use('/', require('./pages/core/routes/core.route'));
app.use('/cars-user', require('./pages/cars-user/routes/cars-user.route'));
app.use('/trips-driver', require('./pages/trips-driver/routes/trips-driver.route'));
app.use('/trips-passager', require('./pages/trips-passager/routes/trips-passager.route'));
app.use('/users', require('./pages/users/routes/users.route'));
app.use('/addresses-user', require('./pages/addresses-user/routes/addresses-user.route'));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next();
});


// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
});



module.exports = app;