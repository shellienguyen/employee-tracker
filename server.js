// Import dependencies.
const express = require( 'express' );
const inquirer = require('inquirer');
const mySqlConnection = require( './db/db-connection' );
const app = express();
const morganLogger = require( 'morgan' );
const consTable = require( 'console.table' );

// Import query functions
const {
   viewAllEmployees,
   viewAllRoles,
   viewEmployeesByRole,
   viewAllManagers,
   viewEmployeesByManager,
   viewAllDepartments,
   calcDepartmentBudget,
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
const {
   departmentMenuPrompts,
   showListOfDepartments
 } = require( './lib/department-menu-prompts' );

// Setup Express middleware to json parse and urlendoded for POST requests.
app.use( express.urlencoded({ extended: false }));
app.use( express.json());

// Setup morgan middleware to log HTTP requests and errors.
app.use( morganLogger( 'dev' ));

//app.use( '/api', apiRoutes );

////////////////////////////////////////////////////////////////////////////////


const viewADepartmentBudget = async () => {
   const showAllDepartments = await viewAllDepartments();
   const listOfDepartments = await showListOfDepartments( showAllDepartments );

   let departmentListPrompt = [
      {
         type: 'list',
         name: 'departmentListOptions',
         message: `Choose a department:`,
         choices: listOfDepartments
      }
   ];

   const { departmentListOptions: departmentOptionSelected } = await inquirer.prompt( departmentListPrompt );
   const departmentBudget = await calcDepartmentBudget( departmentOptionSelected );

   console.table( departmentBudget );
   return baseOptionsPrompts();
};


const departmentMenuOptions = async () => {
   const { departmentMenuOptions: departmentOptionSelected } = await inquirer.prompt( departmentMenuPrompts );

   switch ( departmentOptionSelected ) {
      case 'View All Departments':
         const showAllDepartments = await viewAllDepartments();
         console.table( showAllDepartments );

         return baseOptionsPrompts();
      case 'View Department Budget':
         viewADepartmentBudget();
      default:
         return;
   };
};


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
         return;
   };
};


const baseOptionsPrompts = async () => {
   const { baseMenuOptions: basebaseOptionSelected } = await inquirer.prompt( baseMenuPrompts );

   switch ( basebaseOptionSelected ){
      case 'View Department Data':
         departmentMenuOptions();
         break;
      case 'View All Roles':
         const showAllRoles = await viewAllRoles();
         console.table( showAllRoles );

         return baseOptionsPrompts();
      case 'View Employee Data':
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
      case '** Exit':
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