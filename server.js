// Import dependencies.
const express = require( 'express' );
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3306;
const mySqlConnection = require( './db/db-connection' );
const app = express();
const morganLogger = require( 'morgan' );
const inputCheck = require( './utils/inputCheck' );
const consTable = require( 'console.table' );

// Don't have to specify index.js in the path as Node.js will
// automatically look for an index.js.
const apiRoutes = require( './routes/apiRoutes' );

// Import query functions
const {
   viewAllEmployees,
   viewAllRoles,
   viewEmployeesByRole,
   viewAllManagers,
   viewEmployeesByManager,
   updateEmployeeRole,
   updateEmployeeManager,
   addAnEmployee,
   deleteAnEmployee,
   addNewRole,
   deleteARole,
   deleteDepartment,
   addDepartment
 } = require ( './db/db-queries' );

// Import prompts
const baseMenuPrompts = require( './lib/base-menu-prompts' );
const employeeMenuPrompts = require( './lib/employee-menu-prompts' );
const {
   showListOfRoles,
   showListOfManagers
 } = require( './lib/role-menu-prompts' );

// Setup Express middleware to json parse and urlendoded for POST requests.
app.use( express.urlencoded({ extended: false }));
app.use( express.json());

// Setup morgan middleware to log HTTP requests and errors.
app.use( morganLogger( 'dev' ));

//app.use( '/api', apiRoutes );

////////////////////////////////////////////////////////////////////////////////


const employeeMenuOptions = async () => {
   const { employeeMenuOptions: employeeOptionSelected } = await inquirer.prompt( employeeMenuPrompts );

   switch( employeeOptionSelected ) {
      case 'View All Employees':
         const showAllEmployees = await viewAllEmployees();
         console.table( showAllEmployees );

         return baseOptionsPrompts();
      case 'View Employees by Role':
         const showAllRoles = await viewAllRoles();
         const listOfRoles = await showListOfRoles( showAllRoles );

         let roleListPrompt = [
            {
               type: 'list',
               name: 'roleListOption',
               message: 'Choose role to view:',
               choices: listOfRoles
            }
         ];

         const { roleListOption: roleOptionSelected } = await inquirer.prompt( roleListPrompt );
         const showEmployeesByRole = await viewEmployeesByRole(  roleOptionSelected );

         console.table( showEmployeesByRole );

         return baseOptionsPrompts();
      case 'View Employees by Manager':
         const showAllManagers = await viewAllManagers();
         const listOfManagers = await showListOfManagers( showAllManagers );

         let managerListPrompt = [
            {
               type: 'list',
               name: 'managerListOption',
               message: 'Choose manager to view:',
               choices: listOfManagers
            }
         ];

         const { managerListOption: managerOptionSelected } = await inquirer.prompt( managerListPrompt );
         const showEmployeesByManager = await viewEmployeesByManager(  managerOptionSelected );

         console.table( showEmployeesByManager );

         return baseOptionsPrompts();
      default:
         break;
   };
};


const baseOptionsPrompts = async () => {
   const { baseMenuOptions: basebaseOptionSelected } = await inquirer.prompt( baseMenuPrompts );

   switch ( basebaseOptionSelected ){
      case 'View All Departments':
         break;
      case 'View All Roles':
         break;
      case 'View Employees':
         employeeMenuOptions();
         break;
      case 'Add a Department':
         break;
      case 'Add a Role':
         break;
      case 'Add an Employee':
         break;
      case 'Update an Employee Role':
         break;
      case 'Exit':
         mySqlConnection.end();
         break;
      default:
         mySqlConnection.end();
         break;
   };
};


// Connect to the MySQL database.
mySqlConnection.connect( err => {
   if ( err ) throw err;
   
   console.log( 'Connected as id ' + mySqlConnection.threadId + '\n' );
   
   baseOptionsPrompts();
});