const env = require('dotenv');

env.config();
const { Client } = require('pg');

class Database {
  constructor() {
    const config = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };
    this.client = new Client(config);
    this.client.connect();
  }

  selectP(...args) {
    this.selectParams = args;
    return this;
  }

  from(table) {
    this.from = table;
    return this;
  }

  where(arg) {
    this.where = arg;
    return this;
  }

  sort(by, arg) {
    this.arg = arg;
    this.by = by;
    return this;
  }

  createTable() {
    const query = 'CREATE TABLE orders(id SERIAL PRIMARY KEY, order_items VARCHAR(10000) not null, status VARCHAR(100) not null, amount INT not null, user_id INT REFERENCES users(id))';
    this.client.query(query)
      .then((res) => {
        this.endClient();
        return res.rows;
      })
      .catch((e) => {
        this.endClient();
        return e.stack;
      });
  }

  testselect() {
    const holder = this.client.query("SELECT id FROM users WHERE email='jessam@joyson.com'")
      .then((res) => {
        return res.rows;
      });
    return holder;
  }

  result() {
    let queryString = `SELECT ${this.selectParams.join()} FROM ${this.from}`;
    if (this.where !== null) {
      const keys = Object.keys(this.where).join();
      const values = Object.values(this.where);
      queryString = `${queryString} WHERE ${keys} = '${values}'`;
      const holder = this.client.query(queryString)
        .then((res) => {
          return res.rows;
        })
        .catch((e) => {
          return e.stack;
        });
      return holder;
    }
    const query = {
      name: 'executeQuery',
      text: queryString,
    };
    const holder = this.client.query(query)
      .then((res) => {
        return res.rows;
      })
      .catch((e) => {
        return e.stack;
      });
    return holder;
  }

  // end connection to database
  endClient() {
    this.client.end();
  }

  insert(data, table) {
    const fields = Object.keys(data).join();
    const values = Object.values(data);
    const number = Object.keys(data).length;
    let pmQuery = '';
    for (let i = 1; i <= number; i += 1) {
      if (pmQuery === '') pmQuery = `$${i}`;
      else {
        pmQuery = `${pmQuery}, $${i}`;
      }
    }
    const text = `INSERT INTO ${table}(${fields}) VALUES(${pmQuery})`;

    this.client.query(text, values)
      .then();
  }

  update(id, data) {
    const entries = Object.entries(data);
    let queryString = '';
    for (const [column, value] of entries) {
      if (queryString === '') {
        queryString = `${column} = '${value}'`;
      } else {
        queryString = `${queryString}, ${column} = '${value}'`;
      }
    }
    const text = `UPDATE orders SET ${queryString} WHERE id=${id}`;
    this.client.query(text)
      .then();
  }
}
module.exports.Database = Database;
