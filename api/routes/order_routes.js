const controller = require('../controllers/order_controllers.js');

const orderRouter = (app) => {
  // Get all the orders
  app.get('/api/v1/orders', controller.getAllOrders);

  // Get all the orders for a particular user
  app.get('/api/v1/users/:userid/orders', controller.getUserOrders);

  // Get a specific order
  app.get('/api/v1/orders/:id', controller.getSpecificOrder);

  // Place a new order
  app.post('/api/v1/orders/', controller.postOrder);

  // Update an existing order
  app.put('/api/v1/orders/:id', controller.updateOrder);

  // Delete a specific order
  app.delete('/api/v1/orders/:id', controller.deleteOrder);
};
module.exports = orderRouter;
