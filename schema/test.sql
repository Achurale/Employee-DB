SELECT
        CONCAT(e.first_name, ' ', e.last_name) AS Name,
        r.title AS Role,
        r.salary AS Salary,
        d.name AS Department,
        CONCAT(m.first_name, ' ', m.last_name) AS Manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN dept d ON r.dept_id = d.id
    LEFT JOIN employee m ON e.mgr_id = m.id;