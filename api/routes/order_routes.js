const database = require('../models/database.js');

const db = new database.Database();


const orderRouter = (app) => {
  // Get all the orders
  app.get('/api/v1/orders', (request, response) => {
    const query = 'SELECT id, order_items, status, amount, user_id, time FROM orders';
    db.client.query(query)
      .then((res) => {
        if (res.rows) {
          response.status(200).json(res.rows);
        } else {
          response.status(200).json({ status: 'success', message: 'No orders yet' });
        }
      });
  });

  // Get all the orders for a particular user
  app.get('/api/v1/users/:userid/orders', (request, response) => {
    const userId = request.params.userid;
    const query = `SELECT id, order_items, status, amount, user_id, time FROM orders WHERE user_id=${userId}`;
    db.client.query(query)
      .then((res) => {
        if (res.rows) {
          response.status(200).json(res.rows);
        } else {
          response.status(200).json({ status: 'success', message: 'No orders from this user' });
        }
      });
  });

  // Get a specific order
  app.get('/api/v1/orders/:id', (request, response) => {
    const { id } = request.params.id;
    const query = `SELECT id, order_items, status, amount, user_id, time FROM orders WHERE id=${id}`;
    db.client.query(query)
      .then((res) => {
        if (res.rows) {
          response.status(200).json(res.rows);
        } else {
          response.status(404).json({ status: 'error', message: 'Order not found' });
        }
      });
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
      response.status(201).json({ status: 'success', message: 'order has been placed' });
    } else {
      response.status(400).json({ status: 'error', message: 'Invalid data' });
    }
  });

  // Update an existing order
  app.put('/api/v1/orders/:id', (request, response) => {
    const { id } = request.params;
    if (request.body.status) {
      request.body.order_items = JSON.stringify(request.body.order_items);
    }
    db.update(id, request.body);
    response.json({ status: 'success', message: 'Order has been updated' });
  });

  // Delete a specific order
  app.delete('/api/v1/orders/:id', (request, response) => {
    const { id } = request.params;
    const query = `SELECT id from ORDERS WHERE id=${id}`;
    db.client.query(query)
      .then((res) => {
        if (res.rows[0]) {
          db.delete(id, 'orders');
          response.status(200).json({ status: 'success', message: 'Order has been deleted' });
        } else {
          response.status(404).json({ status: 'error', message: 'Order not found' });
        }
      });
    db.delete(id, 'orders');
  });
};
module.exports = orderRouter;
