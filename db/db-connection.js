// Dependencies
const mySql = require( 'mysql2' );

// Require and configure environment variables
require( 'dotenv' ).config();

// Instantiating the connection to the MySQL database
const mySqlConnection = mySql.createConnection({
      host: 'localhost',
      port: 3306,

      // Environment variables stored inside .env file
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
});

// Export the MySQL connection
module.exports = mySqlConnection;