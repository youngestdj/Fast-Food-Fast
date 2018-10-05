const models = require('../models/login_models.js');
const sModel = require('../models/signup_models.js');

exports.logUserIn = (request, response) => {
  sModel.selectEmail(request.body.email, (result) => {
    if (!result[0]) {
      response.status(422).json({ status: 'error', message: 'Invalid email' });
    }
  });
  models.verifyPassword(request.body.email, request.body.password, (result) => {
    if (result) {
      response.status(200).json({ status: 'success', message: 'Login successful!' });
    } else {
      response.status(422).json({ status: 'error', message: 'Invalid password' });
    }
  });
};
