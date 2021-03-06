DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE employees (
   id INTEGER PRIMARY KEY,
   firstName VARCHAR( 30 ),
   lastName VARCHAR( 30 ),
   roleId INTEGER,
   mangerId INTEGER
); 