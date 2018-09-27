const database = require('../models/database.js');

const db = new database.Database();

const menuRouter = (app) => {
  // API endpoint for admin to add new menu option
  app.post('/api/v1/menu/', (request, response) => {
    if (request.body.food && parseInt(request.body.price, 10) && request.body.quantifier) {
      const food = request.body.food.trim();
      const price = request.body.price.trim();
      const quantifier = request.body.quantifier.trim();
      // check if food is already in database
      const query = `SELECT food FROM menu WHERE food='${request.body.food}'`;
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

  // API endpoint for user to get options
  app.get('/api/v1/menu/', (request, response) => {
    const query = 'SELECT id, food, price, quantifier FROM menu';
    db.client.query(query)
      .then((res) => {
        if (res.rows) {
          response.send(res.rows);
        } else {
          response.send({ status: 'success', message: 'No menu yet' });
        }
      });
  });
};

module.exports = menuRouter;
