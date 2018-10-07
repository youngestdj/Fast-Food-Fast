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
}

const signUserUp = (data) => {
  db.insert(data, 'users');
};
module.exports = {
  selectEmail,
  signUserUp,
  selectId,
};
