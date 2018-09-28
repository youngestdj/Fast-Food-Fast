const passwordHash = require('password-hash');
const database = require('../models/database.js');
const helper = require('../helper.js');

const db = new database.Database();

const signupRouter = (app) => {
  app.post('/api/v1/auth/signup/', (request, response) => {
    if (request.body.password && request.body.firstname && request.body.lastname) {
      const password = passwordHash.generate(request.body.password);
      const firstname = request.body.firstname.trim();
      const lastname = request.body.lastname.trim();
      if (!helper.isEmail(request.body.email)) {
        response.send({ status: 'error', message: 'Invalid email' });
      }
      const email = request.body.email.trim();
      const query = `select email from users where email='${request.body.email}'`;
      db.client.query(query)
        .then((res) => {
          if (!res.rows[0]) {
            const data = {
              password, firstname, lastname, email,
            };
            db.insert(data, 'users');
            response.status(200).send({ status: 'success', message: 'registration successful!' });
          } else {
            response.send({ status: 'error', message: 'User already exists' });
          }
        });
    } else {
      response.send({ status: 'error', message: 'Invalid data' });
    }
  });
};

module.exports = signupRouter;
