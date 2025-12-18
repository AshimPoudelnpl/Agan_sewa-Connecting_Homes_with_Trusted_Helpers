CREATE DATABASE Angan_sewa;

use Angan_sewa;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('staff', 'manager', 'admin') DEFAULT 'manager',
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id)
);

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into
    users (name, email, password)
values (
        "ram",
        "ram@gmail.com",
        "123456"
    ),
    (
        "shirish",
        "shirish@gmail.com",
        "123456"
    ),
    (
        "nabin ",
        "nabin@gmail.com",
        "123456"
    );

alter table users add column img varchar(255) Null;

use angan_sewa;

CREATE TABLE province (
    province_id INT AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(100) not null
);

CREATE TABLE district (
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    province_id INT NOT NULL,
    FOREIGN KEY (province_id) REFERENCES province (province_id)
);

CREATE TABLE branch (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL UNIQUE,
    district_id INT NOT NULL,
    remarks VARCHAR(255) NULL,
    FOREIGN KEY (district_id) REFERENCES district (district_id)
);

CREATE TABLE inquiry (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(150) NULL,
    description TEXT NULL,
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id)
);

CREATE TABLE review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    star INT NULL,
    description TEXT NOT NULL,
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id)
);

CREATE TABLE TrustedCustomers (
    trustedcustomer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    img TEXT NOT NULL
);

CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'staff',
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
    gallery_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    staff_id UNSIGNED INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id),
    FOREIGN KEY (staff_id) REFERENCES staff (staff_id)
);