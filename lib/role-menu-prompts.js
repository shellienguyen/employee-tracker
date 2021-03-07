const showListOfRoles = ( roles ) => {
   const listOfRoles = roles.map(( role ) => {
      const rolesObj = { name: role.title, value: role.id };
      return rolesObj;
   });

   return listOfRoles;
};


const showListOfManagers = ( managers ) => {
   const listOfManagers = managers.map(( manager ) => {
      const managersObj = { name: manager.manager, value: manager.id };
      return managersObj;
   });

   return listOfManagers;
};


module.exports = {
   showListOfRoles,
   showListOfManagers
};