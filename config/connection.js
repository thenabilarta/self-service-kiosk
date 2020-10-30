const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'self-kiosk',
});

connection.connect();

module.exports = connection;
