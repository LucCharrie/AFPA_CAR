let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'afpa',
  database : 'afpa_car_v02'
});

connection.connect();

module.exports = connection;
