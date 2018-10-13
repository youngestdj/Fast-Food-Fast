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
  let query = '';
  for (let j = 1; j <= number; j += 1) {
    if (query === '') query = `$${j}`;
    else {
      query = `${query}, $${j}`;
    }
  }
  const text = `INSERT INTO users(${fields}) VALUES(${query})`;
  db.client.query(text, values)
    .then((result) => {
      callback(result);
    });
};
module.exports = {
  selectEmail,
  signUserUp,
  selectId,
};
