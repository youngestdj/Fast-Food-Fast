const database = require('../models/database.js');

const db = new database.Database();

const loginRouter = (app) => {
  app.post('/api/v1/menu/', (request, response) => {
    if (request.body.food && parseInt(request.body.price, 10) && request.body.quantifier) {
      const food = request.body.food.trim();
      const price = request.body.price.trim();
      const quantifier = request.body.quantifier.trim();
      const query = `select food from menu where food='${request.body.food}'`;
      db.client.query(query)
        .then((res) => {
          if (!res.rows[0]) {
            const data = {
              food, price, quantifier,
            };
            db.insert(data, 'menu');
            response.send({ status: 'success', message: 'Menu added' });
          } else {
            response.send({ status: 'error', message: 'Food already exists in database' });
          }
        });
    } else {
      response.send({ status: 'error', message: 'invalid data' });
    }
  });
};

module.exports = loginRouter;
