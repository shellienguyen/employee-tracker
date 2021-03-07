const employeeMenuPrompts = [
   {
      type: 'list',
      name: 'employeeMenuOptions',
      message: 'Choose an option:',
      choices: ['View All Employees', 'View Employees by Role', 'View Employees by Manager']
   }
];

module.exports = employeeMenuPrompts;