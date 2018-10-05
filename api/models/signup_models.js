const database = require('./database.js');

const db = new database.Database();

const selectEmail = (email, callback) => {
  const query = `SELECT email from users WHERE email='${email}'`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows);
    });
};

const signUserUp = (data) => {
  db.insert(data, 'users');
};
module.exports = {
  selectEmail,
  signUserUp,
};
