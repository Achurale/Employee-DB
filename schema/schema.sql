DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE dept(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES dept(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    mgr_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (mgr_id) REFERENCES employee(id)
);

INSERT INTO dept (name)
VALUES
("Sales"),
("Legal"),
("Finance"),
("Engineering");

INSERT INTO role (title, salary, dept_id)
VALUES
("Sales Boss", 100000, 1),
("Legal Boss", 120000, 2),
("Financial Boss", 125000, 3),
("Engineering Boss", 136500, 4),
("Salaryman", 65000, 1),
("Legalatarian", 95000, 2),
("Finance Father", 75500, 3),
("Engineer Lackey", 85500, 4);

INSERT INTO employee (first_name, last_name, role_id, mgr_id)
VALUES
("Inigo", "Montoya", 1, null),
("Saul", "Goodman", 2, null),
("Phil", "Dunphy", 3, null),
("Montgomery", "Scott", 4, null),
("Bob", "Belcher", 5, 1),
("Matt", "Murdock", 6, 2),
("Helena", "Carter", 7, 3),
("Emmett", "Brown", 8, 4);