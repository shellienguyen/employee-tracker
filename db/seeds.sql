USE employeesDB;

/******************************************************************************/

INSERT INTO department
   ( name )
VALUES
   ( 'Engineering' ), /* id = 1 */
   ( 'Business Development' ), /* id = 2 */
   ( 'Finance' ), /* id = 3 */
   ( 'HR' ), /* id = 4 */
   ( 'Sales' ), /* id = 5 */
   ( 'Marketing' ), /* id = 6 */
   ( 'Public Relations' ), /* id = 7 */
   ( 'Business Logistics' ), /* id = 8 */
   ( 'Events Planning'), /* id = 9 */
   ( 'Legal' ), /* id = 10 */
   ( 'Admin' ); /* id = 11 */

/******************************************************************************/

INSERT INTO role
   ( title, salary, departmentId )
VALUES
   ( 'Engineering Manager', 150000, 1 ), /* roleId = 1 */
   ( 'Senior Engineer', 125000, 1 ), /* roleId = 2 */
   ( 'Engineer', 110000, 1 ), /* roleId = 3 */
   ( 'Junior Engineer', 70000, 1 ), /* roleId = 4 */
   ( 'Electrial Technologist', 90000, 1 ), /* roleId = 5 */
   ( 'Strategic Partnerships Manager', 105000, 2 ), /* roleId = 6 */
   ( 'Strategic Alliance Specialist', 85000, 2 ), /* roleId = 7 */
   ( 'Finance Head', 120000, 3 ), /* roleId = 8 */
   ( 'Budget Analyst', 90000, 3 ), /* roleId = 9 */
   ( 'Auditor', 110000, 3 ), /* roleId = 10 */
   ( 'HR Manager', 125000, 4 ), /* roleId = 11 */
   ( 'HR Associate', 65000, 4 ), /* roleId = 12 */
   ( 'Account Executive', 150000, 5 ), /* roleId = 13 */
   ( 'Sales Consultant', 90000, 5 ), /* roleId = 14 */
   ( 'Chief Marketing Officer', 150000, 6 ), /* roleId = 15 */
   ( 'Marketing Consultant', 90000, 6 ), /* roleId = 16 */
   ( 'Marketing Associate', 65000, 6 ), /* roleId = 17 */
   ( 'Brand Ambassador', 300000, 7 ), /* roleId = 18 */
   ( 'Director of Logistics', 210000, 8 ), /* roleId = 19 */
   ( 'Warehousing Logistics', 120000, 8 ), /* roleId = 20 */
   ( 'Events Coordinator', 90000, 9 ), /* roleId = 21 */
   ( 'Lead Legal Advisor', 300000, 10 ), /* roleId = 22 */
   ( 'Legal Advisor', 210000, 10 ), /* roleId = 23 */
   ( 'Vice President', 50000, 11 ), /* roldId = 24 */
   ( 'Receptionist', 40000, 11 ), /* roleId = 25 */
   ( 'Department Secretary', 60000, 11 ), /* roleId = 26 */
   ( 'Executive Secretary', 90000, 11 ); /* roleId = 27 */

/******************************************************************************/

/* Employees without a manager */
INSERT INTO employees 
   ( firstName, lastName, roleID )
VALUES
   ( 'Sidonie', 'Sedonia', 1 ),
   ( 'Christopher', 'Ronsburger', 6 ),
   ( 'Kyle', 'Nguyen', 8 ),
   ( 'Sophia', 'Lorenz', 11 ),
   ( 'Zoie', 'Thompson', 13 ),
   ( 'Alexander', 'DeVante', 15 ),
   ( 'Ethan', 'RuanJingtian', 18 ),
   ( 'Shellie', 'Nguyen', 19 ),
   ( 'Julia', 'Mongoria', 21 ),
   ( 'Robert', 'Johnson', 22 );

/******************************************************************************/

/* Employees with a manager */
INSERT INTO employees
   ( firstName, lastName, roleId, managerId )
VALUES
   ( 'Karen', 'Warren', 2, 1 ),
   ( 'Kitty', 'Santos', 2, 1 ),
   ( 'Erik', 'Barren', 3, 1 ),
   ( 'Doug', 'Bartson', 3, 1 ),
   ( 'Steve', 'Boddin', 3, 1 ),
   ( 'Melissa', 'Aniston', 4, 1 ),
   ( 'Yvonne', 'Donnason', 4, 1 ),
   ( 'Marilla', 'Thomson', 4, 1 ),
   ( 'Jennifer', 'Young', 5, 1 ),
   ( 'John', 'Stevenson', 5, 1 ),
   ( 'Alex', 'Garcia', 7, 6 ),
   ( 'Alexandria', 'Chung', 7, 6 ),
   ( 'Annie', 'Chen', 9, 8 ),
   ( 'Lynda', 'Nguyen', 10, 8 ),
   ( 'Rebecca', 'Ruan', 10, 8 ),
   ( 'Hanna', 'Dang', 12, 11 ),
   ( 'Charmaine', 'Sheh', 14, 13 ),
   ( 'Sunny', 'Barnes', 14, 13 ),
   ( 'Keira', 'Kendra', 14, 13 ),
   ( 'Bart', 'McCarthy', 14, 13 ),
   ( 'Ethan', 'Lam', 14, 13 ),
   ( 'Milan', 'Moorlan', 14, 13 ),
   ( 'Alexis', 'Arlen', 16, 15 ),
   ( 'Alden', 'Gemma', 16, 15 ),
   ( 'Gwenn', 'Arlington', 17, 15 ),
   ( 'Jonathan', 'Gordon', 20, 19 ),
   ( 'Ben', 'Quiones', 20, 19 ),
   ( 'Benny', 'Alexia', 20, 19 ),
   ( 'Anita', 'Yuen', 23, 22 ),
   ( 'Angela', 'Baby', 23, 22 ),
   ( 'Angel', 'Boxton', 23, 22 ),
   ( 'Noah', 'Barde', 23, 22 ),
   ( 'Joey', 'Ardeno', 25, 24 ),
   ( 'Kaye', 'Barlene', 26, 24 ),
   ( 'Natalia', 'DeLavitan', 27, 24 ),
   ( 'Lauren', 'Tromsoh', 25, 24 );