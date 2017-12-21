let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'afpa',
  database : 'afpacar'
});

connection.connect();

module.exports = connection;
