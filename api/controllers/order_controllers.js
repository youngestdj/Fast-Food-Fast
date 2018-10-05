const models = require('../models/order_models.js');

exports.getAllOrders = (request, response) => {
  models.getAllOrders((result) => {
    if (result) {
      response.status(200).json(result);
    } else {
      response.status(200).json({ status: 'success', message: 'No orders yet' });
    }
  });
};

exports.getUserOrders = (request, response) => {
  models.getUserOrders(request.params.userid, (result) => {
    if (result) {
      response.status(200).json({ status: 'success', message: result });
    } else {
      response.status(200).json({ status: 'success', message: 'No orders from this user' });
    }
  });
};
exports.getSpecificOrder = (request, response) => {
  models.getSpecificOrder(request.params.id, (result) => {
    if (result) {
      response.status(200).json({ status: 'success', message: result });
    } else {
      response.status(404).json({ status: 'error', message: 'Order does not exist' });
    }
  });
};
exports.deleteOrder = (request, response) => {
  models.selectOrder(request.params.id, (result) => {
    if (result !== '') {
      models.deleteOrder(request.params.id);
      response.status(200).json({ status: 'success', message: 'Order has been deleted' });
    } else {
      response.status(404).json({ status: 'error', message: 'Order not found' });
    }
  });
};
exports.postOrder = (request, response) => {
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
    models.postOrder(data);
    response.status(201).json({ status: 'success', message: 'order has been placed' });
  } else {
    response.status(400).json({ status: 'error', message: 'Invalid data' });
  }
};

exports.updateOrder = (request, response) => {
  const { id } = request.params;
  if (request.body.order_items) {
    request.body.order_items = JSON.stringify(request.body.order_items);
    models.selectOrder(id, (result) => {
      if (result !== '') {
        models.updateOrder(id, request.body);
        response.status(201).json({ status: 'success', message: 'Order has been Updated' });
      } else {
        response.status(404).json({ status: 'error', message: 'Order not found' });
      }
    });
  }
};
