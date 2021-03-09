const baseMenuPrompts = [
   {
      type: 'list',
      name: 'baseMenuOptions',
      message: 'Choose an option:',
      choices: [ 'View Department Data', 'View Role Data', 'View Employee Data', 'Add Data', 'Update Data', 'Delete Data', '** Exit **' ]
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


const deleteDataMenuPrompts = [
   {
      type: 'list',
      name: 'deleteMenuOptions',
      message: `Choose an option:`,
      choices: [ 'Delete an Employee', 'Delete a Role', 'Delete a Deparment' ]
   }
];


module.exports = {
   baseMenuPrompts,
   addDataMenuPrompts,
   deleteDataMenuPrompts
};