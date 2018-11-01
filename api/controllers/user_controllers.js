const models = require('../models/user_models.js');

exports.getUser = (request, response) => {
  const { id } = request.params;
  models.getUser(id, (result) => {
    if (!result) {
      response.status(422).json({ status: 'error', message: 'Invalid id' });
    } else {
      response.status(200).json({ status: 'success', message: result });
    }
  });
};

exports.getUserFromToken = (request, response) => {
  const id = request.userId;
  models.getUser(id, (result) => {
    if (!result) {
      response.status(422).json({ status: 'error', message: 'Invalid id' });
    } else {
      response.status(200).json({ status: 'success', message: result });
    }
  });
};
