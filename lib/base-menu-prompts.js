const baseMenuPrompts = [
   {
      type: 'list',
      name: 'baseMenuOptions',
      message: 'Choose an option:',
      choices: [ 'View All Departments', 'View All Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit' ]
   }
];


 module.exports = baseMenuPrompts;