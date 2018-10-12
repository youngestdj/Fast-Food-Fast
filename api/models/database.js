const env = require('dotenv');

env.config();
const { Client } = require('pg');

class Database {
  constructor() {
    const config = {
      connectionString: process.env.DATABASE_URL,
    };
    this.client = new Client(config);
    this.client.connect();
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

  delete(id, table) {
    const query = `DELETE from ${table} where id='${id}'`;
    this.client.query(query);
  }
}
module.exports.Database = Database;
