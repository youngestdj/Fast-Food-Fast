CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) not null,
    firstname VARCHAR(50) not null,
    lastname VARCHAR(50) not null,
    password VARCHAR(200) not null,
)
CREATE TABLE orders
(
    id SERIAL PRIMARY KEY,
    order_items VARCHAR(10000) not null,
    status VARCHAR(100) not null,
    amount INT not null,
    time VARCHAR(100) not null,
    user_id INT REFERENCES users(id)
)
CREATE TABLE menu
(
    id SERIAL PRIMARY KEY,
    food VARCHAR(100) not null,
    price INT not null,
    quantifier VARCHAR(20) not null,
)

CREATE TABLE admin
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) not null,
    password VARCHAR(200) not null,
)