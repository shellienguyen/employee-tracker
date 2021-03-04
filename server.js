// Import dependencies.
const express = require( 'express' );
const PORT = process.env.PORT || 3001;
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

app.use( '/api', apiRoutes );

////////////////////////////////////////////////////////////////////////////////