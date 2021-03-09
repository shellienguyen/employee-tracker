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
   deleteEmployee,
   deleteRole,
   deleteDepartment,
   getListOfEmployees
 } = require ( './db/db-queries' );

// Import prompts
const {
   baseMenuPrompts,
   addDataMenuPrompts,
   deleteDataMenuPrompts
 } = require( './lib/base-menu-prompts' );

const {
   employeeMenuPrompts,
   updateMenuPrompts,
   showListOfEmployees
} = require( './lib/employee-menu-prompts' );

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
 
// Setup morgan middleware to log HTTP requests and errors.
app.use( morganLogger( 'dev' ));


////////////////////////////////////////////////////////////////////////////////


// View the sum of all employee salaries for a single department.
const viewADepartmentBudget = async () => {
   // Query the list of departments from db
   const showAllDepartments = await viewAllDepartments();

   // Put the list of departments in an object.
   const listOfDepartments = await showListOfDepartments( showAllDepartments );

   let departmentListPrompt = [
      {
         type: 'list',
         name: 'departmentListOptions',
         message: `Choose a department:`,
         choices: listOfDepartments
      }
   ];

   // Prompt the user to choose a department.
   const { departmentListOptions: departmentOptionSelected } = await inquirer.prompt( departmentListPrompt );
   
   // Query the sum of salaries from db.
   const departmentBudget = await calcDepartmentBudget( departmentOptionSelected );

   console.table( departmentBudget );
   return baseOptionsPrompts();
};


// Options whether to view list of departments or view department's total salary.
const departmentMenuOptions = async () => {
   // Prompt the user to choose an option.
   const { departmentMenuOptions: departmentOptionSelected } = await inquirer.prompt( departmentMenuPrompts );

   switch ( departmentOptionSelected ) {
      case 'View All Departments':
         const showAllDepartments = await viewAllDepartments();
         console.table( showAllDepartments );

         return baseOptionsPrompts();
      case 'View Department Budget':
         viewADepartmentBudget();
   };
};


// User has the options to view all employees, view employees by role, or view employees by manager.
const employeeMenuOptions = async () => {
   // Prompt the user to choose an option.
   const { employeeMenuOptions: employeeOptionSelected } = await inquirer.prompt( employeeMenuPrompts );

   switch( employeeOptionSelected ) {
      case 'View All Employees':
         const showAllEmployees = await viewAllEmployees();
         console.table( showAllEmployees );

         return baseOptionsPrompts();
      case 'View Employees by Role':
         // Query the db for the list of roles.
         const showAllRoles = await viewAllRoles();

         // Put the list of roles in an object.
         const listOfRoles = await showListOfRoles( showAllRoles );

         let roleListPrompt = [
            {
               type: 'list',
               name: 'roleListOption',
               message: 'Choose role to view:',
               choices: listOfRoles
            }
         ];

         // Prompt the user to choose a role.
         const { roleListOption: roleOptionSelected } = await inquirer.prompt( roleListPrompt );
         
         // Retrieve list of employees based on the selected role.
         const showEmployeesByRole = await viewEmployeesByRole(  roleOptionSelected );

         console.table( showEmployeesByRole );

         return baseOptionsPrompts();
      case 'View Employees by Manager':
         // Query the db for the list of managers.
         const showAllManagers = await viewAllManagers();

         // Put the list of managers in an object.
         const listOfManagers = await showListOfManagers( showAllManagers );

         let managerListPrompt = [
            {
               type: 'list',
               name: 'managerListOption',
               message: 'Choose manager to view:',
               choices: listOfManagers
            }
         ];

         // Prompt the user to choose a manager.
         const { managerListOption: managerOptionSelected } = await inquirer.prompt( managerListPrompt );
         
         // Retrieve list of employees based on the selected manager.
         const showEmployeesByManager = await viewEmployeesByManager(  managerOptionSelected );

         console.table( showEmployeesByManager );

         return baseOptionsPrompts();
   };
};


// Add a new department.
const addADepartment = async () => {
   const {newDepartmentName: newDepartmentToAdd } = await inquirer.prompt( addADepartmentPrompts );

   addDepartment( newDepartmentToAdd );

   console.log( '**************************************' );
   console.log( '* The new department has been added. *' );
   console.log( '**************************************' );

   return baseOptionsPrompts();
};


// Add a new role
const addARole = async () => {
   // Query the db for a list of departments to assign the new role to.
   const allDeparments = await viewAllDepartments();

   // Put the list of departments in object
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

   // Prompt the user for the info pertaining to the new role.
   const newRoleObj = await inquirer.prompt( addRolePrompts );

   // Add the new role to the db.
   addNewRole( newRoleObj );

   console.log( '********************************' );
   console.log( '* The new role has been added. *' );
   console.log( '********************************' );

   return baseOptionsPrompts();
};


// Add a new employee to the db.
const addANewEmployee = async () => {
   // Query the db for the list of managers to assign the new employee to.
   const allManagers = await viewAllManagers();

   // Put the list of managers in an object.
   const showAllManagers = await showListOfManagers( allManagers );

   // Query the db for the list of roles to assign the new employee to.
   const allRoles = await viewAllRoles();

   // Put the list of roles in an object.
   const showAllRoles = await showListOfRoles( allRoles );

   const addEmployeePrompts = [
      {
         type: 'input',
         name: 'newEmployeeFirstName',
         message: `Input the new employee's first name:`,
         validate: newEmployeeFirstNameInput => {
            if ( newEmployeeFirstNameInput && newEmployeeFirstNameInput.trim().length > 0 ) {
               return true;
            }
            else {
               console.log( `Input the new employee's first name:` );
               return false;
            };
         }
      },
      {
         type: 'input',
         name: 'newEmployeeLastName',
         message: `Input the new employee's last name:`,
         validate: newEmployeeLastNameInput => {
            if ( newEmployeeLastNameInput && newEmployeeLastNameInput.trim().length > 0 ) {
               return true;
            }
            else {
               console.log( `Input the new employee's last name:` );
               return false;
            };
         }
      },
      {
         type: 'list',
         name: 'managerId',
         message: `Choose the new employee's manager:`,
         choices: showAllManagers
      },
      {
         type: 'list',
         name: 'roleId',
         message: `Choose the new employee's role:`,
         choices: showAllRoles
      }
   ];

   // Prompt the user for the info pertaining to the new employee.
   const newEmployeeObj = await inquirer.prompt( addEmployeePrompts );

   // Add the new employee to the db.
   addAnEmployee( newEmployeeObj );

   console.log( '************************************' );
   console.log( '* The new employee has been added. *' );
   console.log( '************************************' );

   return baseOptionsPrompts();
};


// Re-assign the employee to a different role.
const updateAnEmployeeRole = async () => {
   // Query the db for the list of employees for the user to choose from.
   const allEmployees = await getListOfEmployees();

   // Put the list of employees in an object.
   const showAllEmployees = await showListOfEmployees( allEmployees );

   const employeeListPrompt = [
      {
         type: 'list',
         name: 'employeeToUpdate',
         message: `Choose an Employee:`,
         choices: showAllEmployees
      }
   ];

   // Prompt the user to choose the employee.
   const { employeeToUpdate: employeeOptionSelected } = await inquirer.prompt( employeeListPrompt );

   // Query the db for the list of roles for the user to choose from.
   const allRoles = await viewAllRoles()

   // Put the list of roles in an object.
   const showAllRoles = await showListOfRoles( allRoles );

   const rolesPrompt = [
      {
         type: 'list',
         name: 'newRole',
         message: `Choose the New Role:`,
         choices: showAllRoles
      }
   ];

   // Prompt the user to choose a role to re-assign the  employee to.
   const { newRole: roleOptionSelected } = await inquirer.prompt( rolesPrompt );

   // Update the employee's role.
   updateEmployeeRole( roleOptionSelected, employeeOptionSelected );

   console.log( `*************************************` );
   console.log( `* Employee's role has been updated. *` );
   console.log( `*************************************` );

   return baseOptionsPrompts();
};


// Re-assign the employee to a different manager.
const updateAnEmployeeManager = async () => {
   // Query the db for the list of employees for the user to choose from.
   const allEmployees = await getListOfEmployees();

   // Put the list of employees in an object.
   const showAllEmployees = await showListOfEmployees( allEmployees );

   const employeeListPrompt = [
      {
         type: 'list',
         name: 'employeeToUpdate',
         message: `Choose an Employee:`,
         choices: showAllEmployees
      }
   ];

   // Prompt the user to choose the employee.
   const { employeeToUpdate: employeeOptionSelected } = await inquirer.prompt( employeeListPrompt );

   // Query the db for the list of managers for the user to choose from.
   const allManagers = await viewAllManagers()

   // Put the list of mangers in an object.
   const showAllManagers = await showListOfManagers( allManagers );

   const managersPrompt = [
      {
         type: 'list',
         name: 'newManager',
         message: `Choose the New Manager:`,
         choices: showAllManagers
      }
   ];

   // Prompt the user to choose a manager to re-assign the employee to.
   const { newManager: managerOptionSelected } = await inquirer.prompt( managersPrompt );

   // Update the employee's manager.
   updateEmployeeManager( managerOptionSelected, employeeOptionSelected );

   console.log( `****************************************` );
   console.log( `* Employee's manager has been updated. *` );
   console.log( `****************************************` );

   return baseOptionsPrompts();
};


// Delete a department from the db.
const deleteADepartment = async () => {

   // Query the db for the list of departments for the user to choose from.
   const allDepartments = await viewAllDepartments();

   // Put the list of departments in an object.
   const showAllDepartments = await showListOfDepartments( allDepartments );

   const departmentListPrompt = [
      {
         type: 'list',
         name: 'departmentToDelete',
         message: `Choose a Department:`,
         choices: showAllDepartments
      }
   ];

   // Prompt the user to chooe a department to remove.
   const { departmentToDelete: departmentOptionSelected } = await inquirer.prompt( departmentListPrompt );
   
   // Delete the selected department from the db.
   deleteDepartment( departmentOptionSelected );

   console.log( `************************************` );
   console.log( `* The department has been deleted. *` );
   console.log( `************************************` );

   return baseOptionsPrompts();
};


// Delete a role from the db.
const deleteARole = async () => {
   // Query the db for the list of roles for the user to choose from.
   const allRoles = await viewAllRoles();

   // Put the list of roles in an object.
   const showAllRoles = await showListOfRoles( allRoles );

   const roleListPrompt = [
      {
         type: 'list',
         name: 'roleToDelete',
         message: `Choose a Role:`,
         choices: showAllRoles
      }
   ];

   // Prompt the user to choose a role to remove.
   const { roleToDelete: roleOptionSelected } = await inquirer.prompt( roleListPrompt );

   // Delete the selected role from the db.
   deleteRole( roleOptionSelected );

   console.log( `******************************` );
   console.log( `* The role has been deleted. *` );
   console.log( `******************************` );

   return baseOptionsPrompts();
};


// Delete an employee from the db.
const deleteAnEmployee = async () => {
   // Query the db for the list of employees for the user to choose from.
   const allEmployees = await getListOfEmployees();

   // Put the list of employees in an object.
   const showAllEmployees = await showListOfEmployees( allEmployees );

   const employeeListPrompt = [
      {
         type: 'list',
         name: 'employeeToDelete',
         message: `Choose an Employee:`,
         choices: showAllEmployees
      }
   ];

   // Prompt the user to choose an employee to remove.
   const { employeeToDelete: employeeOptionSelected } = await inquirer.prompt( employeeListPrompt );

   // Delete the employee from the db.
   deleteEmployee( employeeOptionSelected );

   console.log( `**********************************` );
   console.log( `* The employee has been deleted. *` );
   console.log( `**********************************` );

   return baseOptionsPrompts();
};


const deleteMenuOptions = async () => {
   const { deleteMenuOptions: deleteDataOptionSelected } = await inquirer.prompt( deleteDataMenuPrompts );

   switch( deleteDataOptionSelected ) {
      case 'Delete an Employee':
         deleteAnEmployee();
         break;
      case 'Delete a Role':
         deleteARole();
         break;
      case 'Delete a Deparment':
         deleteADepartment();
         break;
   };
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
         addANewEmployee();
         break;
   };
};


const updateMenuOptions = async () => {
   const { updateMenuOptions: updateOptionSelected } = await inquirer.prompt( updateMenuPrompts );

   switch ( updateOptionSelected ) {
      case 'Update Employee Role':
         updateAnEmployeeRole();
         break;
      case 'Update Employee Manager':
         updateAnEmployeeManager();
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
      case 'Update Data':
         updateMenuOptions();
         break;
      case 'Delete Data':
         deleteMenuOptions();
         break;
      case '** Exit **':
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