const passwordHash = require('password-hash');
const database = require('../models/database.js');

const db = new database.Database();

const loginRouter = (app) => {
  app.post('/api/v1/auth/login/', (request, response) => {
    if (request.body !== '') {
      const query = `select password from users where email='${request.body.email}'`;
      db.client.query(query)
        .then((res) => {
          if (res.rows[0]) {
            const password = passwordHash.verify(request.body.password, res.rows[0].password);
            if (password) {
              response.send({ status: 'success', message: 'Login successful!' });
            } else {
              response.send({ status: 'error', message: 'Invalid password' });
            }
          } else {
            response.send({ status: 'error', message: 'Invalid email' });
          }
        });
    }
  });
};

module.exports = loginRouter;
