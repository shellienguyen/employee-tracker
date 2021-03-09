const baseMenuPrompts = [
   {
      type: 'list',
      name: 'baseMenuOptions',
      message: 'Choose an option:',
      choices: [ 'View Department Data', 'View Role Data', 'View Employee Data', 'Add Data', 'Update Data', '** Exit **' ]
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