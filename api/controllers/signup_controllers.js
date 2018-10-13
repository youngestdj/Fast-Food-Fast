const passwordHash = require('password-hash');
const models = require('../models/signup_models.js');
const lModels = require('../models/login_models.js');
const helper = require('../helper.js');


exports.signUserUp = (request, response) => {
  if (request.body.password && request.body.firstname && request.body.lastname) {
    const email = request.body.email.trim();
    models.selectEmail(email, (result) => {
      if (!result) {
        if (!helper.isEmail(request.body.email)) {
          response.status(422).json({ status: 'error', message: 'Invalid email' });
        } else {
          const password = passwordHash.generate(request.body.password);
          const firstname = request.body.firstname.trim();
          const lastname = request.body.lastname.trim();
          const data = {
            password, firstname, lastname, email,
          };
          models.signUserUp(data, (result2) => {
            if (result2) {
              lModels.getUser(email, (result1) => {
                const token = helper.signToken(result1);
                response.status(201).send({
                  auth: true, token, status: 'success', message: 'registration successful!',
                });
              });
            }
          });
        }
      } else {
        response.status(409).json({ status: 'error', message: 'User already exists' });
      }
    });
  } else {
    response.status(422).json({ status: 'error', message: 'Invalid data' });
  }
};
