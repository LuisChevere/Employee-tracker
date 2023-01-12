INSERT INTO department (name)
VALUES
('Executive'),
('Accounting & Finance'),
('Technology'),
('Marketing & Sales'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 300000, 1),
('Account Manager', 200000, 2),
('Data Analyst', 165000, 3),
('Software developers', 125000, 3),
('CFO', 250000, 2),
('Sales Manager', 80000, 5),
('HR Director', 150000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, null),
('Dwight', ' Schrute', 2, 1),
('Jim', 'Halpert', 3, 2),
('Pam', 'Beesly', 4, null),
('Ryan', 'Howard', 5, 3),
('Andy', 'Bernard', 5, 1),
('Kevin', 'Malone', 3, 4),
('Toby', 'Flenderson', 4, 5),
('Stanley', 'Hudson', 2, 6);