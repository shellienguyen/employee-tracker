const baseMenuPrompts = [
   {
      type: 'list',
      name: 'baseMenuOptions',
      message: 'Choose an option:',
      choices: [ 'View Department Data', 'View All Roles', 'View Employee Data', 'Add Data', 'Update an Employee Role', '** Exit **' ]
   }
];


const addDataMenuPrompts = [
   {
      type: 'list',
      name: 'addMenuOptions',
      message: 'Choose an option:',
      choices: [ 'Add a Department', 'Add a Role', 'Add an Employee' ]
   }
];


module.exports = {
   baseMenuPrompts,
   addDataMenuPrompts
};