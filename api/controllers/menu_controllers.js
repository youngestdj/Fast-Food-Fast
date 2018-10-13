const models = require('../models/menu_models.js');

exports.addMenu = (request, response) => {
  if (request.body.food && parseInt(request.body.price, 10) && request.body.quantifier) {
    const food = request.body.food.trim();
    const price = request.body.price.trim();
    const quantifier = request.body.quantifier.trim();
    models.checkMenu(food, (result) => {
      if (!result) {
        const data = {
          food, price, quantifier,
        };
        models.addMenu(data);
        response.status(201).json({ status: 'success', message: 'Menu added' });
      } else {
        response.status(422).json({ status: 'error', message: 'Food already exists in database' });
      }
    });
  } else {
    response.status(422).json({ status: 'error', message: 'Invalid data' });
  }
};

exports.getMenu = (request, response) => {
  models.getMenu((result) => {
    if (result) {
      response.status(200).json({ status: 'success', message: result });
    } else {
      response.status(200).json({ status: 'error', message: 'No menu yet' });
    }
  });
};
