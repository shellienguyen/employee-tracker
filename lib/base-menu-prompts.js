const baseMenuPrompts = [
   {
      type: 'list',
      name: 'baseMenuOptions',
      message: 'Choose an option:',
      choices: [ 'View Department Data', 'View All Roles', 'View Employee Data', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', '** Exit' ]
   }
];


 module.exports = baseMenuPrompts;