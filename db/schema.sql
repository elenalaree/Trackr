DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);


CREATE TABLE job (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER
);

CREATE TABLE employee (
employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
job_id INTEGER,
manager_id INTEGER
);