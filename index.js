const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const e = require('express');

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
    })
};

function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
            console.table(res);
            options();
        }
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'Which department would you like to add?'
        }
    ]).then(function (answers) {
        connection.query(`INSERT INTO department(name) VALUES ('${answers.newDepartmentName}');`, (err, res) => {
            if (err) throw err;
            console.log('New department has been added!');
            console.log(res);
            options();
        })
    })
};

function viewAllRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
        console.table(res);
        options();
    })
};

function addRole() {
    connection.query('SELECT * FROM department', (err, data) => {
        if(err) throw err;
        let deptArray = data.map(function (department) {
            return {
                name: department.name,
                value: department.id
            }
        });

        inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleSalary',
                message: 'Please enter salary for role.',
                validate: salaryInput => {
                    if (isNaN(salaryInput)) {
                        console.log('Please enter a number.')
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department does the new role belong to?',
                choices: deptArray
            }
        ]).then(function(answers) {
            connection.query(`INSERT INTO role (title, salary, departmentId) VALUES ('${answers.newRoleName}', '${answers.newRoleSalary}', '${answers.departmentId}');`, (err, res) => {
                if (err) throw err;
                console.log('New role added!');
                console.log(res);
                options();
            })
        })
    });
}

function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name AS department, CONCAT(manager.first_name)," ", manager.last_name) As manager FROM employee

    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`

    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
        console.table(res);
        options();
    })
};

function addEmployee() {
    let roleArray = [];
    let managerArray = [];
    connection.query('SELECT id, title FROM role', (err, data) => {
        if(err) throw err;
        roleArray = data.map(function(role) {
            return{
                name: role.title,
                value: role.id
            }
        });
        connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
            if(err) throw err;
            managerArray = data.map(function(employee) {
                return{
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            });
            managerArray.push({
                value: null,
                name: 'None'
            })

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newFirstName',
                    message: 'Please enter first name of employee.'
                },
                {
                    type: 'input',
                    name: 'newLastName',
                    message: 'Please enter last name of employee.'
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'What is the employee role?',
                    choices: roleArray
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'Who is the employee manager?',
                    choices: managerArray
                },
            ]).then(function (answers) {
                const query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [answers.newFirstName, answers.newLastName, answers.employeeRole, answers.empManager];
                connection.query(query, params, (err, res) => {
                    if(err) throw err;
                    console.log('New employee added!');
                    console.log(res);
                    options();
                })
            })
        })
    })
}

function updateEmployeeRole() {
    let roleArray = [];
    let employee = [];
    connection.query('SELECT id, title FROM role', (err, res) => {
        if (err) throw err;
        roleArray = data.map(function (role) {
            return{
                name: role.title,
                value: role.id
            }
        });
        connection.query('SELECT id, first_name, last_name FROM employee', (err, data) => {
            if (err) throw err;
            employeeArray = data.map(function (employee) {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            });

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'upEmployee',
                    message: 'Which employee would you like to update?',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Which role would you like to assign selected employee?',
                    choices: roleArray
                },
            ]).then(function (answers) {
                connection.query(`UPDATE employee SET role_id = '${answers.newRole}' WHERE id = '${answers.upEmployee}'`, (err, res) => {
                    if(err) throw err;
                    console.log('Employee updated!');
                    console.log(res);
                    options();
                })
            })
        })
    })
}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter name of department you would like to delete.'
        }
    ]).then
}