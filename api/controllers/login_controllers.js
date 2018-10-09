const jwt = require('jsonwebtoken');
const models = require('../models/login_models.js');
const sModel = require('../models/signup_models.js');

exports.logUserIn = (request, response) => {
  sModel.selectEmail(request.body.email, (result) => {
    if (!result) {
      response.status(422).json({ status: 'error', message: 'Invalid email' });
    }
  });
  models.verifyPassword(request.body.email, request.body.password, (result) => {
    if (result) {
      models.getUser(request.body.email, (result2) => {
        const token = jwt.sign({ id: result2.id, role: result2.role }, process.env.SECRET, {
          expiresIn: 86400000000,
        });
        response.status(200).json({
          status: 'success', message: 'Login successful!', auth: true, token,
        });
      });
    } else {
      response.status(422).json({ status: 'error', message: 'Invalid password' });
    }
  });
};
