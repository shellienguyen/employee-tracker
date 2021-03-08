const { resolve } = require('path');
const { connect } = require('./db-connection');
const connection = require( './db-connection' );


////////////////////////////////////////////////////////////////////////////////


// View data for all of  the company employees listed in the database.
const viewAllEmployees = () => {
   return new Promise(( resolve, reject ) => {
      // Self-join the employees table for hierarchical data, to get the manager name.
      const sql = `SELECT e1.id, e1.firstName, e1.lastName, role.title,
                           department.name AS deptName, role.salary,
                           CONCAT( m1.firstName, ' ', m1.lastName ) as manager
                   FROM employees AS e1
                   LEFT JOIN role ON e1.roleId = role.id
                   LEFT JOIN department ON role.departmentId = department.id
                   LEFT JOIN employees AS m1 ON e1.managerId = m1.id`;
      const queryAllEmployees = connection.query( sql, ( err, allEmployeesResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( allEmployeesResult );
      });
   });
};


// View data for all of the available company roles.
const viewAllRoles = () => {
   return new Promise(( resolve, reject ) => {
      const sql = `SELECT * FROM role`;
      const queryAllRoles = connection.query( sql, ( err, allRolesResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( allRolesResult );
      });
   });
};


// View data for all employees based on a user-selected role.
const viewEmployeesByRole = ( roleToView ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `SELECT e1.id, e1.firstName, e1.lastName, role.title,
                           department.name as deptName, role.salary, 
                           CONCAT ( m1.firstName, ' ', m1.lastName) AS manager 
                   FROM employees AS e1 
                   LEFT JOIN role ON e1.roleId = role.id 
                   LEFT JOIN department ON role.departmentId = department.id 
                   LEFT JOIN employees AS m1 ON e1.managerId = m1.id 
                   WHERE e1.roleId = ?`;
      const queryEmployeesByRole = connection.query( sql, [ roleToView ], ( err, employeesByRoleResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( employeesByRoleResult );
      });
   });
};


// View data for all of the available company managers.
const viewAllManagers = () => {
   return new Promise(( resolve, reject ) => {
      const sql = `SELECT DISTINCT m1.id, CONCAT ( m1.firstName, ' ', m1.lastName) AS manager
                   FROM employees AS e1
                   INNER JOIN employees AS m1
                   ON e1.managerId = m1.id`;

      const queryAllManagers = connection.query( sql, ( err, allManagersResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( allManagersResult );
      });
   });
};


// View data for all employees based on a user-selected manager.
const viewEmployeesByManager = ( managerToView ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `SELECT e1.id, e1.firstName, e1.lastName, role.title,
                          department.name AS deptName, role.salary,
                          CONCAT ( m1.firstName, ' ', m1.lastName) AS manager
                   FROM employees AS e1
                   LEFT JOIN role ON e1.roleId = role.id
                   LEFT JOIN department ON role.departmentId = department.id
                   LEFT JOIN employees AS m1 ON e1.managerId = m1.id
                   WHERE m1.id = ?`;
      const queryEmployeesByManager = connection.query( sql, [ managerToView ], ( err, employeesByManagerResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( employeesByManagerResult );
      });
   });
};


// View all departments
const viewAllDepartments = () => {
   return new Promise(( resolve, reject ) => {
      sql = `SELECT * FROM department`;
      queryAllDepartments = connection.query( sql, ( err, allDepartmentResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( allDepartmentResult );
      });
   });
};


const calcDepartmentBudget = ( departmentId ) => {
   return new Promise(( resolve, reject ) => {
      sql = `SELECT SUM( role.salary ) AS departmentSalarySum
             FROM role
             RIGHT JOIN employees ON employees.roleId = role.id
             LEFT JOIN department ON role.departmentId = department.id
             WHERE department.id = ?`;
      const queryDepartmentBudget = connection.query( sql, [ departmentId ], ( err, budgetResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( budgetResult );
      });
   });
};


// ADd a new department to the department table.
const addDepartment = ( departmentId ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `INSERT INTO department ( name ) VALUES( ? )`;
      const queryAddDepartment = connection.query( sql, [ departmentId ], ( err, addResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( addResult );
      });
   });
};


// Add a new role to the role table
const addNewRole = ( newRoleToAdd ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `INSERT INTO role ( title, salary, departmentId )
                   VALUES ( ?, ?, ? )`;
      const params = [ newRoleToAdd.newRoleTitle,
                       newRoleToAdd.newRoleSalary,
                       newRoleToAdd.newRoleDepartment ];
      const queryAddNewRole = connection.query( sql, params, ( err, newRoleResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( newRoleResult );
      });
   });
};


// Add a new employee to the database.
const addAnEmployee = ( employeeToAdd ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `INSERT INTO employees ( firstName, lastName, roleId, ManagerId )
                   VALUES (?, ?, ?, ? )`;
      const params = [ employeeToAdd.newEmployeeFirstName,
                       employeeToAdd.newEmployeeLastName,
                       employeeToAdd.roleId,
                       employeeToAdd.managerId ];
      const queryAddAnEmployee = connection.query( sql, params, ( err, newEmployeeResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( newEmployeeResult );
      });
   });
};


// Update an employee's role
const updateEmployeeRole = ( roleToUpdate, employeeToUpdate ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `UPDATE employees SET roleId = ? WHERE id = ?`;
      const queryUpdateEmployeeRole = connection.query( sql, [ roleToUpdate, employeeToUpdate ], ( err, roleUpdateResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( roleUpdateResult );
      });
   });
};


// Update an employee's manager
const updateEmployeeManager = ( managerToUpdate, employeeToUpdate ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `UPDATE employees SET managerId = ? WHERE id = ?`;
      const queryUpdateEmployeeManager = connection.query( sql, [ managerToUpdate, employeeToUpdate ], ( err, managerUpdateResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( managerUpdateResult );
      });
   });
};


// Delete an employee from the database.
const deleteAnEmployee = ( id ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `DELETE FROM employees WHERE id = ?`;
      const queryDeleteAnEmployee = connection.query( sql, [ id ], ( err, deleteResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( deleteResult );
      });
   });
};


// Delete a role from the role table.
const deleteARole = ( roleId ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `DELETE FROM role WHERE id = ?`;
      const queryDeleteARole = connection.query( sql, [ roleId ], ( err, deleteRoleResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( deleteRoleResult );
      });
   });
};

// Delete a department from the department table.
const deleteDepartment = ( departmentId ) => {
   return new Promise(( resolve, reject ) => {
      const sql = `DELETE FROM department WHERE id = ?`;
      const queryDeleteDepartment = connection.query( sql, [ departmentId ], ( err, deleteResult ) => {
         if ( err ) {
            console.error( err );
            reject( err );
            return;
         };

         resolve( deleteResult );
      });
   });
};


 module.exports = {
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
   deleteDepartment,
 };