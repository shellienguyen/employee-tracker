// Import dependencies.
const express = require( 'express' );
const PORT = process.env.PORT || 3005;
const mySqlConnection = require( './utils/mySqlConnection' );
const app = express();
const morganLogger = require( 'morgan' );
const inputCheck = require( './utils/inputCheck' );
const db = require( './db/database' );

// Don't have to specify index.js in the path as Node.js will
// automatically look for an index.js.
const apiRoutes = require( './routes/apiRoutes' );

// Setup Express middleware to json parse and urlendoded for POST requests.
app.use( express.urlencoded({ extended: false }));
app.use( express.json());

// Setup morgan middleware to log HTTP requests and errors.
app.use( morganLogger( 'dev' ));

//app.use( '/api', apiRoutes );

////////////////////////////////////////////////////////////////////////////////


// Connect to the MySQL database.
/* mySqlConnection.connect( err => {
   if ( err ) throw err;
   
   console.log( 'Connected as id ' + mySqlConnection.threadId + '\n' );
   
   // Call function to display prompts here
 }); */


/* app.get( '/', (req, res) => {
   res.send('Hello World!');
});

app.listen( 3005, () => {
   console.log('Example app listening on port 3005!');
}); */