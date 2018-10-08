const database = require('./database.js');

const db = new database.Database();

const selectEmail = (email, callback) => {
  const query = `SELECT email from users WHERE email='${email}'`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows[0]);
    });
};
const selectId = (email, callback) => {
  const query = `SELECT id from users WHERE email='${email}'`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows[0]);
    });
};

const signUserUp = (data, callback) => {
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
    const text = `INSERT INTO users(${fields}) VALUES(${pmQuery})`;
    db.client.query(text, values)
      .then((result) => {
        callback(true);
      });
};
module.exports = {
  selectEmail,
  signUserUp,
  selectId,
};
