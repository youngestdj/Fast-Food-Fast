const mock = require('./mockdata.js');
const database = require('../models/database.js');

const db = new database.Database();


const [mockData] = mock.mockData;

const orderRouter = (app) => {
  // Get all the orders
  app.get('/api/v1/orders', (request, response) => {
    const query = 'SELECT id, order_items, status, amount, user_id, time FROM orders';
    db.client.query(query)
      .then((res) => {
        if (res.rows) {
          response.status(200).send(res.rows);
        } else {
          response.send({ status: 'success', message: 'No orders yet' });
        }
      });
  });

  // Get a specific order
  app.get('/api/v1/orders/:id', (req, res) => {
    let [id] = req.params.id;

    if (Number.isNaN(id)) {
      res.status(400).send({ status: 'error', message: 'Invalid URL' });
    } else {
      id -= 1;

      if (!mockData[id]) {
        res.status(404).send({ status: 'error', message: 'Order not found. Where did you get this URL from btw?' });
      }

      res.send(mockData[id]);
    }
  });

  // Place a new order
  app.post('/api/v1/orders/', (request, response) => {
    if (request.body.userId && request.body.orderItems && request.body.amount) {
      const userId = request.body.userId.trim();
      const amount = parseInt(request.body.amount, 10);
      const orderItems = JSON.stringify(request.body.orderItems);
      const status = 'new';
      const dateObj = new Date();
      const time = `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;
      const data = {
        user_id: userId, order_items: orderItems, status, time, amount,
      };
      db.insert(data, 'orders');
      response.status(201).send({ status: 'success', message: 'order has been placed' });
    } else {
      response.status(400).send({ status: 'error', message: 'Invalid data' });
    }
  });

  // Update an existing order
  app.put('/api/v1/orders/:id', (req, res) => {
    let [id] = req.params.id;

    if (Number.isNaN(id)) {
      res.status(400).send({ status: 'error', message: 'Invalid URL' });
    } else {
      id -= 1;

      if (!mockData[id]) {
        res.status(404).send({ status: 'error', message: 'Order not found. Where did you get this URL from btw?' });
      }

      mockData[id].order = req.body;
      res.send(mockData);
    }
  });

  // Delete a specific order
  app.delete('/api/v1/orders/:id', (req, res) => {
    let [id] = req.params.id;

    if (Number.isNaN(id)) {
      res.status(400).send({ status: 'error', message: 'Invalid URL' });
    } else {
      id -= 1;

      if (!mockData[id]) {
        res.status(404).send({ status: 'error', message: 'Order not found. Where did you get this URL from btw?' });
      }

      mockData.splice(id, 1);
      res.status(201).send(mockData);
    }
  });
};

module.exports = orderRouter;
