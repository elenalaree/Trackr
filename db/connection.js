const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Btlizslfz2n26:31',
      database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

module.exports = db;