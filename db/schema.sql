DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employees;


CREATE TABLE department (
   id INTEGER AUTO_INCREMENT NOT NULL,
   name VARCHAR( 30 ),
   PRIMARY KEY ( id )
);


CREATE TABLE role (
   id INTEGER AUTO_INCREMENT NOT NULL,
   title VARCHAR( 30 ) NOT NULL,
   salary DECIMAL( 10, 2 ) NOT NULL,
   departmentId INTEGER,
   PRIMARY KEY ( id ),
   CONSTRAINT fk_department FOREIGN KEY( departmentId ) REFERENCES department ( id ) ON DELETE SET NULL
);


CREATE TABLE employees (
   id INTEGER AUTO_INCREMENT NOT NULL,
   firstName VARCHAR( 30 ) NOT NULL,
   lastName VARCHAR( 30 ) NOT NULL,
   roleId INTEGER,
   managerId INTEGER, 
   PRIMARY KEY ( id ),
   CONSTRAINT fk_role FOREIGN KEY( roleId ) REFERENCES role ( id ) ON DELETE SET NULL,
   CONSTRAINT fk_manager FOREIGN KEY( managerId ) REFERENCES role ( id ) ON DELETE SET NULL
);