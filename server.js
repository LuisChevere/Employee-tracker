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
    .then(function (answers) {
        console.log('view');
        switch (answers.menu) {
            case 'View All Departments':
            viewAllDepartments();
            break;
            case 'Add Department':
                addDepartment();
            break;
            case 'View All Roles':
                viewAllRoles();
            break;
            case 'Add Role':
                addRole();
            break;
            case 'View All Employees':
                viewAllEmployees();
            break;
            case 'Add Employee':
                addEmployee();
            break;
            case 'Update Employee Role':
                updateEmployeeRole();
            break;
            case 'Delete Department':
                deleteDepartment();
            break;
            case 'Delete Employee':
                deleteEmployee();
            break;
            case 'Delete Role':
                deleteRole();
            break;
            case 'Quit':
                    quitApp();
            break;
            default:
                console.log("Wrong choice.")    
        }
    });
}