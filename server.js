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

