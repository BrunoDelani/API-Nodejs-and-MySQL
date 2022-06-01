# APINodeMySQL
API com Node e MySQL

# Dependencies
npm install mysql2 dotenv nodemon

# Script
Add start": "nodemon ./index.js localhost 3000"

# Database
MySQL Workbench database:

create database nodejs;

use nodejs;

create table client (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
mail VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(20) NOT NULL,
PRIMARY KEY (id));
