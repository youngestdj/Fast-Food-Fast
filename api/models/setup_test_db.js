const database = require('./database.js');

const db = new database.Database();


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
    status VARCHAR(100) not null,
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
'abcdef',
'admin')`;
db.client.query(query1).then((res) => console.log(res));
db.client.query(query2).then((res) => console.log(res));
db.client.query(query3).then((res) => console.log(res));
db.client.query(query4).then((res) => {
    console.log(res);
    db.endClient();
});
