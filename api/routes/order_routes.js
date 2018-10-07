const controller = require('../controllers/order_controllers.js');
const verifyToken = require('../auth/verify_token.js');

const orderRouter = (app) => {
  // Get all the orders
  app.get('/api/v1/orders', verifyToken.verifyToken, controller.getAllOrders);

  // Get all the orders for a particular user
  app.get('/api/v1/users/:userid/orders', verifyToken.verifyToken, controller.getUserOrders);

  // Get a specific order
  app.get('/api/v1/orders/:id', verifyToken.verifyToken, controller.getSpecificOrder);

  // Place a new order
  app.post('/api/v1/orders/', verifyToken.verifyToken, controller.postOrder);

  // Update an existing order
  app.put('/api/v1/orders/:id', verifyToken.verifyToken, controller.updateOrder);

  // Delete a specific order
  app.delete('/api/v1/orders/:id', verifyToken.verifyToken, controller.deleteOrder);
};
module.exports = orderRouter;
