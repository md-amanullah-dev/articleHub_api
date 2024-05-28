-- create table suer querry 
create table user(
    id INT primary key AUTO_INCREMENT,
    name VARCHAR(250),
    email VARCHAR(250) UNIQUE,
    password VARCHAR(250),
    status VARCHAR(250),
    isDeletable VARCHAR(250),
);

-- Insert query

insert into user(name,email,password,status,isDeletable)values("admin","admi@gamil.com",'123456','true','false');

-- create table category query

create table category(
    id INT primary key AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
)