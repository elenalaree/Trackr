const express = require("express");
const inquirer = require("inquirer");
const router = express.Router();
const db = require("../db/connection");
const inputCheck = require("../utils/inputCheck");

let departmentArray;

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
    name: "employeeRoll",
    message: "What is this employee's role?",
    // choices: rollList,
  },
  {
    type: "choice",
    name: "manager",
    message: "Who is this employee's manager?",
    // choices: employeeList,
  },
];

  function promptMenu() {
    inquirer.prompt(introQuestions).then((answers) => {
      const choices  = answers.intro;
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
    let sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS 'department',
                role.salary
                FROM employee, role, department
                WHERE department.id = role.department_id
                AND role.id = employee.id`;
    db.query(sql, (error, response) => {
      if (error) throw error;
      console.table(response);
      promptMenu();
    });
  }
  //Choices section
  function roleChoices() {
    db.query("SELECT title FROM role", (err, res) => {
      if (err) throw err;

      var roleArray = [];
      for (let i = 0; i < res.length; i++) {
        roleArray.push(res[i].title);
      }
    });
    return roleArray;
  }

  function departmentChoices() {
    db.query("SELECT name FROM department", (err, res) => {
      if (err) throw err;

      let departmentArray = [];
      for (let i = 0; i < res.length; i++) {
        departmentArray.push(res[i].name);
      }
    });
    return departmentArray;
  }
  async function deptArr() {
    const dArray = await departmentChoices();
    return dArray;
  }

  function employeeChoices() {
    db.query("SELECT first_name, last_name, CONCAT(first_name, ' ', last_name) as manager_id FROM employee", (err, res) => {
      if (err) throw err;

      var employeeArray = [];
      for (let i = 0; i < res.length; i++) {
        employeeArray.push(res[i].manager_id);
      }
    });
    return employeeArray;
  }
// add info section
function addDepartment() {
    inquirer.prompt(departmentQuestions)
            .then(answers => {
              insertDepartment(answers);
            })
}

function addRole() {
  departmentChoices();
  inquirer.prompt(roleQuestions)
          .then(answers => {
            insertRole(answers);
          })
}

  //Insert into section
  function insertDepartment(answers) {
    const sql =`INSERT INTO department (name)
      VALUES(?) `
    const params = [answers.department];
    db.query(sql, params, (err, result) =>{
        if (err) {
          console.log("An error occurred!");
          return error;
        }
        console.log('Department Added')
        promptMenu();
      }
    );
  }
  

  function insertRole(answers) {
    const sql =`INSERT INTO department (title, salary, department)
      VALUES(?,?,?) `
    const params = [answers.title, answers.salary, answers.department];
    db.query(sql, params, (err, result) =>{
        if (err) {
          console.log("An error occurred!");
          return error;
        }
        console.log('Role Added')
        promptMenu();
      }
    );
  }

  function insertEmployee() {
    db.query(
      `INSERT INTO employee SET ?`,
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: answers.role_id,
        department: answers.department,
      },
      (error) => {
        if (error) throw error;
        console.log("Oh dear. That failed.");
      }
    );
  }


promptMenu();


