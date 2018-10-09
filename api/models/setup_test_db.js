const passwordHash = require('password-hash');
const database = require('./database.js');

const db = new database.Database();
const password = passwordHash.generate('abcdef');



const query1 = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) not null,
    firstname VARCHAR(50) not null,
    lastname VARCHAR(50) not null,
    password VARCHAR(200) not null,
    role VARCHAR(10) default 'user'
)`;
const query2 = `CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    order_items VARCHAR(10000) not null,
    status VARCHAR(100) default 'new',
    amount INT not null,
    time VARCHAR(100) not null,
    user_id INT REFERENCES users(id)
)`;
const query3 = `CREATE TABLE menu(
    id SERIAL PRIMARY KEY,
    food VARCHAR(100) not null,
    price INT not null,
    quantifier VARCHAR(20) not null
)`;
const query4 = `INSERT into users(email, firstname, lastname, password, role) VALUES('jessam@joyson.com',
'jessam',
'joyson',
'${password}',
'admin')`;
const query5 = `INSERT into users(email, firstname, lastname, password) VALUES('jessam2@joyson.com',
'jessam',
'joyson',
'${password}')`;
const query6 = `INSERT into orders(user_id, order_items, amount, time) VALUES(
'1',
'test',
'1000',
'now')`;
const query7 = `INSERT into menu(food, price, quantifier) VALUES(
'Fufu',
'50',
'wrap')`;

db.client.query(query1).then((res) => console.log(res));
db.client.query(query2).then((res) => console.log(res));
db.client.query(query3).then((res) => console.log(res));
db.client.query(query4).then((res) => console.log(res));
db.client.query(query5).then((res) => console.log(res));
db.client.query(query6).then((res) => console.log(res));
db.client.query(query7).then((res) => {
    console.log(res);
    db.endClient();
});

