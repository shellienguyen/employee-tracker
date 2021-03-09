# employee-tracker

## Description
The purpose of this Employee Tracker application is to allow users to be able to view and manage the departments, roles, and employees in a company
to help the company organize and plan their business.  The application runs at the command prompt and when executed it will take the user through a
series of command prompt questions where the user has the option to:
- View a list of all employees.
- View a list of employees based a job role.
- View a list of employees based on a manager.
- View a list of all job roles.
- Add a new employee.
- Add a new job role.
- Add a new department.
- Update an employee's job role.
- Update an employee's manager.
- Delete an employee.
- Delete a job role.
- Delete a deparment.

## How to clone this Employee Tracker:

1. In your browser, navigate to the (https://github.com/shellienguyen/employee-tracker) GitHub repository.
2. Click the green button that says “Code” and copy the SSH key to your clipboard.
3) Navigate to your terminal and to the working directory where you want this repository to be housed at.
4. At the terminal command line, type “git clone ” and paste the SSH key you copied from the repository, hit Enter.
5. This application uses Node.js, Inquirer, and MySQL. Due to large file size these dependencies will not be cloned to your repository.
You will need to install dependencies before executing the application.
6. Open the project in Visul Studio Code and open the "Integrated Terminal.  At the integrated command line inside Visual Studio
Code, type in "npm install" to install the node modules.
7. Then at the command line, type in "npm express inquirer mysql2" to install the rest of the dependencies.
8. Creat a ".env" file at the root directory with the following variables (NOTE: you must replace the info in the brackets with your MySQL username and password and remove the brackets):
    - MYSQL_USERNAME={MySQL username}
    - MYSQL_PASSWORD={MySQL Password}
    - MYSQL_DATABASE=employeesDB

### Instuctional Video

For a demonstration on how to run this application, please watch this video: https://drive.google.com/file/d/1stea6rHOVTR9vrOTCKJBducrGoozp06e/view


### Sample Screenshots of How the Application Works

Below are screenshots of the test output terminal, the user-input questions, and the HTML output for your reference:

![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker1.jpg)
<br><br>
![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker2.jpg)
<br><br>
![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker3.jpg)
<br><br>
![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker4.jpg)
<br><br>
![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker5.jpg)
<br><br>
![Mockup](https://github.com/shellienguyen/employee-tracker/blob/main/src/images/employee-tracker6.jpg)
