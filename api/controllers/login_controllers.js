const models = require('../models/login_models.js');
const sModel = require('../models/signup_models.js');
const helper = require('../helper.js');

exports.logUserIn = (request, response) => {
  sModel.selectEmail(request.body.email, (result) => {
    if (!result) {
      response.status(422).json({ status: 'error', message: 'Invalid email' });
    }
  });
  models.verifyPassword(request.body.email, request.body.password, (result) => {
    if (result) {
      models.getUser(request.body.email, (result2) => {
        const token = helper.signToken(result2);
        response.status(200).json({
          status: 'success', message: 'Login successful!', auth: true, token,
        });
      });
    } else {
      response.status(422).json({ status: 'error', message: 'Invalid password' });
    }
  });
};
