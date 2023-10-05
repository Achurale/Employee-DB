const inquirer = require('inquirer')

const queries = [
    {
        type:'list',
        name:'commands',
        message:'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            new inquirer.Separator(),
            'Create department',
            'Create role',
            'Create employee',
            new inquirer.Separator(),
            'Update employee',
            new inquirer.Separator()
        ]
    }
]

const createDeptQueries = [
    {
        name: 'deptName',
        type: 'input',
        message: 'What is the new department name?'
    }
]

const createRoleQueries = [
    {
        name: 'roleTitle',
        type: 'input',
        message: 'What is the name of the new role?'
    },
    {
        name: 'roleSalary',
        type: 'number',
        message: 'What is the salary of this new role?'
    },
    {
        name: 'roleDeptId',
        type: 'number',
        message: 'What department does this new role fall under?'
    }
]

const createEmployeeQueries = [
    {
        name:'firstName',
        type:'input',
        message:'Input their first name',
    },
    {
        name:'lastName',
        type:'input',
        message:'Input their last name',
    },
    {
        name:'employeeRoleId',
        type:'number',
        message:'What will their role be?',
    },
    // {
    //     name:'employeeMgrId',
    //     type:'list',
    //     message:"Input their manager's ID if applicable",
    //     choices: [
    //         {

    //         }
    //     ]
    // }
]

const choices = [
    {
        name: 'First Name',
        value: 'first_name'
    },
    {
        name: 'Last Name',
        value: 'lastt_name'
    },
    {
        name: 'Role ID',
        value: 'role_id'
    },
    {
        name: "Manager's ID",
        value: 'mgr_id'
    }
]

const updateEmployeeQueries = [
    {
        name:'employeeID',
        type:'number',
        message:'What is the ID of the employee you would like to update?'
    },
    {
        name:'updateEmployee',
        type:'list',
        message:'What would you like to change?',
        choices: choices
    }
]

const updatedName = [
    {
        name:'updatedName',
        type:'input',
        message:'What is the new name?'
    }
]

const updatedID = [
    {
        name:'updatedID',
        type:'number',
        message:'What is the new ID?'
    }
]

module.exports = {
    queries,
    createDeptQueries,
    createEmployeeQueries,
    createRoleQueries,
    updateEmployeeQueries,
    updatedName,
    updatedID
}