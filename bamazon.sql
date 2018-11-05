DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT(6,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Iphone X", "TECH", 987.22, 100), ("HOO TOO Conector", "TECH", 27.25, 500), ("EPSON P-touch", "TECH", 99.89, 50),
("BOSE Ultra Sound", "TECH", 1236.29, 10), ("Iphone 8", "TECH", 787.25, 100), ("Samsung Curve Screen 20", "TECH", 230.99, 20),
("Play Station 4", "TECH", 525.86, 55), ("Play Station 3", "TECH", 320.54, 24), ("MacBook Pro 13", "TECH", 1254.89, 120), 
("MacBook Pro 15", "TECH", 1783.99, 60);