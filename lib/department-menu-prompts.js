const departmentMenuPrompts = [
   {
      type: 'list',
      name: 'departmentMenuOptions',
      message: 'Choose an option:',
      choices: ['View All Departments', 'View Department Budget' ]
   }
];


const showListOfDepartments = ( showAllDepartments ) => {
   const listOfDepartments = showAllDepartments.map(( item ) => {
      const departmentsObj = { name: item.name, value: item.id };
      
      return departmentsObj;
   });

   return listOfDepartments;
};


module.exports = {
   departmentMenuPrompts,
   showListOfDepartments
};