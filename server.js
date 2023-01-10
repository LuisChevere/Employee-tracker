const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '28October!',
        database: 'company_db',
    }
);

function options() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Delete Department',
            'Delete Employee',
            'Delete Role',
            'Quit'
        ]
    })
}