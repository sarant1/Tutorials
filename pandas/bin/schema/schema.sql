USE testing;

DROP TABLE IF EXISTS testing.students;

CREATE TABLE IF NOT EXISTS testing.student (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    age INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    grade float NOT NULL
);