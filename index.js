const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./queries')

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
        password: ''
    },
    console.log(`
    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    
    EMPLOYEE DATABASE ONLINE
    
    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    `)
    );

async function startUp() {
    try {
        const answers = await inquirer.prompt(questions.queries);

        if (answers.commands == 'View all departments') {
            await viewDept()
            startUp()
        } else if (answers.commands == 'View all roles') {
            await viewRole()
            startUp()
        } else if (answers.commands == 'View all employees') {
            await viewEmployee()
            startUp()
        } else if (answers.commands == 'Create department') {
            await createDept()
            startUp()
        } else if (answers.commands == 'Create role') {
            await createRole()
            startUp()
        } else if (answers.commands == 'Create employee') {
            connection.query(`
            SELECT * FROM employee;`, async (err, results) => {
                // console.log([results])
                const managerChoices = results.map((employee) => {
                    console.log()
                    return {name: `${employee.first_name} ${employee.last_name}`, value: `${employee.id}`}
                })
                // console.log(managerChoices)
                managerChoices.unshift({name: `None`, value: null})
                await createEmployee(managerChoices)
                startUp()
            })
        } else if (answers.commands == 'Update employee') {
            await updateEmployee()
            startUp()
        }

    } catch (error) {
        console.error(error)
    }

}

// View function for departments, roles, and employees
function viewDept() {
    connection.query(
        `SELECT
            d.id AS ID,
            d.name AS Department
        FROM dept d;`,
        function(err, results, fields) {
            console.table(results);
        }
    )
}

function viewRole() {
    connection.query(
        `SELECT 
        r.id AS ID,
        r.title AS Title,
        r.salary AS Salary,
        d.name AS Department
    FROM role r
    JOIN dept d ON r.dept_id = d.id;`,
        function(err, results, fields) {
            console.table(results);
        }
    )
}

function viewEmployee() {
    connection.query(
        `SELECT
        e.id AS ID,
        CONCAT(e.first_name, ' ', e.last_name) AS Name,
        r.title AS Role,
        r.salary AS Salary,
        d.name AS Department,
        CONCAT(m.first_name, ' ', m.last_name) AS Manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN dept d ON r.dept_id = d.id
    LEFT JOIN employee m ON e.mgr_id = m.id
    ORDER BY e.id;`,
        function(err, results, fields) {
            console.table(results);
        }
    )
}

// Create a new department
async function createDept() {
    const answers = await inquirer.prompt(questions.createDeptQueries)
    
    if (!answers.deptName.trim()) {
        console.log("Department name cannot be empty. Operation canceled.")
    }

    connection.query(
        `INSERT INTO dept (name)
        VALUES
        ("${answers.deptName}");`,
        function(err,results,fields) {
            console.table(results)
        }
    )
}

// Create a new role
async function createRole() {
    const answers = await inquirer.prompt(questions.createRoleQueries)

    connection.query(
        `INSERT INTO role (title, salary, dept_id)
        VALUES
        ("${answers.roleTitle}", ${answers.roleSalary}, ${answers.roleDeptId});`,
        function(err,results,fields) {
            console.table(results)
        }
    )
}


// Create a new employee
async function createEmployee(managerChoices) {
    const choices = questions.createEmployeeQueries
    choices.push({
        name:'employeeMgrId',
        type:'list',
        message:"Input their manager's ID if applicable",
        choices: managerChoices
    })
    const answers = await inquirer.prompt(choices)
    console.log(answers.employeeMgrId)
    const mgrId = answers.employeeMgrId !== "" ? answers.employeeMgrId : null
    console.log(mgrId)

    try {connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, mgr_id)
        VALUES
        (?, ?, ?, ?);`,
        [answers.firstName, answers.lastName, answers.employeeRoleId, mgrId],
        function(err,results,fields) {
            console.table(results)
        }
    )} catch (err) {
        console.log('Error:', err)
    }
}

// Update existing employee
async function updateEmployee() {
    try{

        const answers = await inquirer.prompt(questions.updateEmployeeQueries)
        const employeeID = answers.employeeID
        const changeOption = answers.updateEmployee

        if (changeOption === 'first_name' || changeOption === 'last_name') {
            const answers = await inquirer.prompt(questions.updatedName)
            const updatedName = answers.updatedName

            await connection.query(
                `UPDATE employee
                SET ? = ?
                WHERE id = ?;`,
                [changeOption, updatedName, employeeID],
                function(err,results,fields) {
                    console.table(results)
                }
            )

            console.log('ID change complete')

        } else {
            const answers = await inquirer.prompt(questions.updatedID)
            const updatedID = answers.updatedID

            await connection.query(
                `UPDATE employee
                SET ? = ?
                WHERE id = ?;`,
                [changeOption, updatedID, employeeID],
                function(err,results,fields) {
                    console.table(results)
                }
            )

            console.log('ID change complete')

        }} catch (error) {
            console.error('Error: ', error)
        }
}

startUp()
