const employeeMenuPrompts = [
   {
      type: 'list',
      name: 'employeeMenuOptions',
      message: 'Choose an option:',
      choices: ['View All Employees', 'View Employees by Role', 'View Employees by Manager']
   }
];


const updateMenuPrompts = [
   {
      type: 'list',
      name: 'updateMenuOptions',
      message: 'Choose an option:',
      choices: [ 'Update Employee Role', 'Update Employee Manager' ]
   }
];


const showListOfEmployees = ( allEmployees ) => {

   const listOfEmployees = allEmployees.map(( item ) => {
     const employeeObj = { name: item.name, value: item.id };
     return employeeObj;
   });
   return listOfEmployees;
 };


module.exports = {
   employeeMenuPrompts,
   updateMenuPrompts,
   showListOfEmployees
};