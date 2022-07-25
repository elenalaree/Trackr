const express = require("express");
const inquirer = require("inquirer");
const router = express.Router();
const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

var departmentArray = [];
var employeeArray = [];
var roleArray = [];

const introQuestions = [
  {
    type: "list",
    name: "intro",
    message: "What do you want to do?",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "Exit",
    ],
  },
];

const departmentQuestions = [
  {
    type: "input",
    name: "department",
    message: "What is the name of the department?",
  },
];

const roleQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the role title?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the role salary?",
  },
  {
    type: "list",
    name: "department",
    message: "What department is this role in?",
    choices: departmentArray,
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is their last name?",
  },
  {
    type: "list",
    name: "title",
    message: "What is this employee's role?",
    choices: roleArray,
  },
  {
    type: "list",
    name: "manager",
    message: "Who is this employee's manager?",
    choices: employeeArray,
  },
];

const managerQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Which employee do you want to update?",
    choices: employeeArray,
  },
  {
    type: "list",
    name: "newManager",
    message: "Which employee is their manager?",
    choices: employeeArray,
  }
];

const editRoleQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Which employee do you want to update?",
    choices: employeeArray,
  },
  {
    type: "list",
    name: "newRole",
    message: "Which role are they switching to?",
    choices: roleArray,
  }
];

function promptMenu() {
  inquirer.prompt(introQuestions).then((answers) => {
    const choices = answers.intro;
    if (choices === "View all Departments") {
      showDepartments();
    }
    if (choices === "View all Roles") {
      showRoles();
    }
    if (choices === "View all Employees") {
      showEmployees();
    }
    if (choices === "Add a Department") {
      addDepartment();
    }
    if (choices === "Add a Role") {
      addRole();
    }
    if (choices === "Add an Employee") {
      addEmployee();
    }
    if (choices === "Update Employee Role") {
      updateRole();
    }
    if (choices === "Update Employee Manager") {
      updateManager();
    }
    if (choices === "Exit") {
      db.end();
    }
  });
}

//Show Section
function showDepartments() {
  const sql = `SELECT department.id AS id, department.name 
                AS department FROM department`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    promptMenu();
  });
}

function showRoles() {
  let sql = `SELECT role.id, role.title, role.salary, department.name
                AS department FROM role
                INNER JOIN department ON role.department_id = department.id`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    promptMenu();
  });
}

function showEmployees() {
  let sql = `SELECT employee.id AS employee_id,
            employee.first_name,
            employee.last_name,
            role.title, 
            role.salary,
            department.name AS department, 
            CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
            FROM role     
            INNER JOIN employee ON role.id = employee.role_id     
            LEFT JOIN department ON role.department_id = department.id     
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            ORDER BY employee_id;`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    promptMenu();
  });
}

// add info section

function addDepartment() {
  inquirer.prompt(departmentQuestions).then((answers) => {
    insertDepartment(answers);
  });
}

function addRole() {
  let departmentArray = [];
  departmentChoices();
  inquirer.prompt(roleQuestions).then((answers) => {
    insertRole(answers);
  });
}

function addEmployee() {
  let roleArray = [];
  let employeeArray = [];
  employeeChoices();
  roleChoices();

  inquirer.prompt(employeeQuestions).then((answers) => {
    insertEmployee(answers);
  });
}

function updateRole() {
  inquirer.prompt(editRoleQuestions).then((answers) => {
    insertRoleChange(answers);
  });
}

function updateManager() {
  let roleArray = [];
  let employeeArray = {};
  employeeChoices();
  
  inquirer.prompt(managerQuestions).then((answers) => {
    insertManager(answers);
  });
}
//Choices section

function roleChoices() {
  db.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArray.push({ name: res[i].title, value: res[i].id });
    }
  });
  console.log(roleArray);
  return roleArray;
}

function departmentChoices() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      departmentArray.push({ name: res[i].name, value: res[i].id });
    }
  });
  return departmentArray;
}

function employeeChoices() {
  
  db.query("SELECT id, first_name, last_name FROM employee;", (err, res) => {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      employeeArray.push({
        name: res[i].first_name + " " + res[i].last_name,
        value: res[i].id,
      });
      
    }
  });
  return employeeArray;
}


//Insert into section

function insertDepartment(answers) {
  const sql = `INSERT INTO department (name)
      VALUES(?) `;
  const params = [answers.department];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return error;
    }
    console.log("Department Added");
    promptMenu();
  });
}

function insertRole(answers) {
  const sql = `INSERT INTO role (title, salary, department_id)
      VALUES(?,?,?) `;
  const params = [answers.title, answers.salary, answers.department];
  console.log(params);
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log("Role Added");
    promptMenu();
  });
}

function insertEmployee(answers) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES(?,?,?,?)`;
  const params = [
    answers.firstName,
    answers.lastName,
    answers.title,
    answers.manager,
  ];
  console.log(params);
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log("Employee Added");
    promptMenu();
  });
}


//update roles
function insertManager(answers) {
  let sql = `UPDATE employee SET manager_id= ? WHERE id= ?`;
  const params = [answers.newManager, answers.employee]
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Manager switched.')
    promptMenu();
  })
}

//Update Role
function insertRoleChange(answers) {
  let sql = `UPDATE employee SET role_id= ? WHERE id= ?`;
  const params = [answers.newRole, answers.employee]
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Role switched.')
    promptMenu();
  })
}

//Start app

  promptMenu();


