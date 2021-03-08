// Import dependencies.
const express = require( 'express' );
const inquirer = require('inquirer');
const mySqlConnection = require( './db/db-connection' );
const app = express();
const morganLogger = require( 'morgan' );

// Import query functions
const {
   viewAllEmployees,
   viewAllRoles,
   viewEmployeesByRole,
   viewAllManagers,
   viewEmployeesByManager,
   viewAllDepartments,
   calcDepartmentBudget,
   addDepartment,
   addNewRole,
   addAnEmployee,
   updateEmployeeRole,
   updateEmployeeManager,
   deleteAnEmployee,
   deleteARole,
   deleteDepartment
 } = require ( './db/db-queries' );

// Import prompts
const {
   baseMenuPrompts,
   addDataMenuPrompts
 } = require( './lib/base-menu-prompts' );

const employeeMenuPrompts = require( './lib/employee-menu-prompts' );

const {
   showListOfRoles,
   showListOfManagers
 } = require( './lib/role-menu-prompts' );

const {
   departmentMenuPrompts,
   addADepartmentPrompts,
   showListOfDepartments
 } = require( './lib/department-menu-prompts' );
 
const { async } = require('rxjs');
 
// Setup Express middleware to json parse and urlendoded for POST requests.
// app.use( express.urlencoded({ extended: false }));
// app.use( express.json());

// Setup morgan middleware to log HTTP requests and errors.
app.use( morganLogger( 'dev' ));


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


const addADepartment = async () => {
   const {newDepartmentName: newDepartmentToAdd } = await inquirer.prompt( addADepartmentPrompts );

   addDepartment( newDepartmentToAdd );

   console.log( '*****************************************************' );
   console.log( '* The new department has been added to the database *' );
   console.log( '*****************************************************' );

   return baseOptionsPrompts();
};


const addARole = async () => {
   // Get the list of departments for the user to choose which department to add the role to
   const allDeparments = await viewAllDepartments();

   // Display the list of departments
   const showAllDepartments = await showListOfDepartments( allDeparments );

   const addRolePrompts = [
      {
         type: 'input',
         name: 'newRoleTitle',
         message: 'Input the new role title:',
         validate: newRoleTitleInput => {
            if ( newRoleTitleInput && newRoleTitleInput.trim().length > 0 ) {
               return true;
            }
            else {
               console.log( `Input the new role title:` );
               return false;
            };
         }
      },
      {
         type: 'input',
         name: 'newRoleSalary',
         message: 'Input the salary for the new role (numbers only):',
         type: 'input',
         validate: newRoleSalaryInput => {
            if ( newRoleSalaryInput
                 && newRoleSalaryInput.trim().length > 0
                 && ( !isNaN( newRoleSalaryInput ))) {
               return true;
            }
            else {
               console.log( `Input the salary for the new role (numbers only):` );
               return false;
            };
         }
      },
      {
         type: 'list',
         name: 'newRoleDepartment',
         message: 'Choose the department for this new role: ',
         choices: showAllDepartments
      }
   ]

   const newRoleObj = await inquirer.prompt( addRolePrompts );
   addNewRole( newRoleObj );

   console.log( '***********************************************' );
   console.log( '* The new role has been added to the database *' );
   console.log( '***********************************************' );

   return baseOptionsPrompts();
};


const addDataMenuOptions = async () => {

   const { addMenuOptions: addDataOptionSelected } = await inquirer.prompt( addDataMenuPrompts );

   switch ( addDataOptionSelected ) {  
      case 'Add a Department':
         addADepartment();
         break;
      case 'Add a Role':
         addARole();
         break;
      case 'Add an Employee':
         break;
      default:
         break;
   };
};


const baseOptionsPrompts = async () => {
   const { baseMenuOptions: baseOptionSelected } = await inquirer.prompt( baseMenuPrompts );

   switch ( baseOptionSelected ){
      case 'View Department Data':
         departmentMenuOptions();
         break;
      case 'View Role Data':
         const showAllRoles = await viewAllRoles();
         console.table( showAllRoles );
         return baseOptionsPrompts();
      case 'View Employee Data':
         employeeMenuOptions();
         break;
      case 'Add Data':
         addDataMenuOptions();
         break;
      case 'Update an Employee Role':
         break;
      case '** Exit **':
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