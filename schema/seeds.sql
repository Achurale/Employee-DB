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