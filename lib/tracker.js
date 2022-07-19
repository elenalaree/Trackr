const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../db/connection');
const inputCheck = require('../utils/inputCheck');


const introQuestions = [
    {
        type: "list",
        name: "intro",
        message: "What do you want to do?",
        choices: ["View all Departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"]
    }
        
    ];

const departmentQuestions = [
    {
        type: "input",
        name: "department",
        message: "What is the name of the department?"
    }
];

const roleQuestions = [
    {
        type: "input",
        name: "title",
        message: "What is the role title?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the role salary?"
    },
    {
        type: "",
        name: "department",
        message: "What department is this role in?"
    }
];

const employeeQuestions = [
    {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is their last name?"
    },
    {
        type: "list",
        name: "employeeRoll",
        message: "What is this employee's role?",
        choices: ["{departments}"]
    },
    {
        type: "input",
        name: "manager",
        message: "Who is this employee's manager?"
    }
];
db.query(`SELECT * FROM department`, (err, name) => {
    if(err) {
        resizeBy.status(500).json({ error: err.message });
        return;
    }
   
    console.log(name)
})



class Tracker {
   addDepartment() {
    inquirer.prompt(departmentQuestions)
    .then(function(answers){
        console.log(answers);
        db.query(`INSERT INTO department SET ?`, {
            name: answers.department
        },
        (error) => {
            if(error) throw error;
            console.log();
        })
    });
   };

   addRole() {
    inquirer.prompt(roleQuestions)
    .then(function(answers){
        console.log(answers);
        db.query(`INSERT INTO role SET ?`, {
            title: answers.title,
            salary: answers.salary,
            department: answers.department
        },
        (error) => {
            if(error) throw error;
            console.log();
        })
    });
   };

   addRole() {
    inquirer.prompt(employeeQuestions)
    .then(function(answers){
        console.log(answers);
        db.query(`INSERT INTO employee SET ?`, {
            first_name: answers.firstName,
            last_name: answers.lastName,
            department: answers.department
        },
        (error) => {
            if(error) throw error;
            console.log();
        })
    });
   };
}



module.exports = Tracker;