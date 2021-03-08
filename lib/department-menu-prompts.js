const departmentMenuPrompts = [
   {
      type: 'list',
      name: 'departmentMenuOptions',
      message: 'Choose an option:',
      choices: ['View All Departments', 'View Department Budget' ]
   }
];


const addADepartmentPrompts = [
   {
      type: 'input',
      name: 'newDepartmentName',
      message: `Input the new department name:`,
      validate: newDepartmentNameInput => {
         if ( newDepartmentNameInput && newDepartmentNameInput.trim().length > 0 ) {
            return true;
         }
         else {
            console.log( `Input the new department name:` );
            return false;
         };
      }
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
   addADepartmentPrompts,
   showListOfDepartments
};