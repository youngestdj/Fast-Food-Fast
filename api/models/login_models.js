const passwordHash = require('password-hash');
const database = require('./database.js');

const db = new database.Database();

const verifyPassword = (email, password, callback) => {
  const query = `SELECT password from users WHERE email='${email}'`;
  db.client.query(query)
    .then((result) => {
      if (result.rows[0]) {
        const checkPassword = passwordHash.verify(password, result.rows[0].password);
        if (checkPassword) {
          callback(true);
        } else {
          callback(false);
        }
      }
    });
};

module.exports = {
  verifyPassword,
};
