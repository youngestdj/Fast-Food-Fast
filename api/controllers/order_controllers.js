const models = require('../models/order_models.js');
/**
 * [getAllOrders gets all orders from the database. Only admins have access to this]
 * @param  {object} request
 * @param  {[response]}
 * @return {[json]}
 */
exports.getAllOrders = (request, response) => {
  if (request.role === 'admin') {
    models.getAllOrders((result) => {
      if (result) {
        response.status(200).json(result);
      } else {
        response.status(200).json({ status: 'success', message: 'No orders yet' });
      }
    });
  } else {
    response.status(401).json({ status: 'error', message: 'You are not authorized to perform this action' });
  }
};

/**
 * [getUserOrders gets all the orders of a specific user. Both admins and users have access to this]
 * @param  {object} request
 * @param  {response}
 * @return {json}
 */
exports.getUserOrders = (request, response) => {
  if ((parseInt(request.params.userid, 10) === parseInt(request.userId, 10)) || request.role === 'admin') {
    models.getUserOrders(request.params.userid, (result) => {
      if (result) {
        response.status(200).json({ status: 'success', message: result });
      } else {
        response.status(200).json({ status: 'success', message: 'No orders from this user' });
      }
    });
  } else {
    response.status(401).json({ status: 'error', message: 'You are not authorized to perform this action' });
  }
};

/**
 * [getSpecificOrder returns the details of a specific order. Only admins have access to this]
 * @param  {request}
 * @param  {response}
 * @return {json}
 */
exports.getSpecificOrder = (request, response) => {
  if (request.role === 'admin') {
    models.getSpecificOrder(request.params.id, (result) => {
      if (result) {
        response.status(200).json({ status: 'success', message: result });
      } else {
        response.status(404).json({ status: 'error', message: 'Order does not exist' });
      }
    });
  } else {
    response.status(401).json({ status: 'error', message: 'You are not authorized to perform this action' });
  }
};

/**
 * [deleteOrder deletes one order. Only admins have access to this]
 * @param  {request} object
 * @param  {response}
 * @return {json}
 */
exports.deleteOrder = (request, response) => {
  if (request.role === 'admin') {
    models.selectOrder(request.params.id, (result) => {
      if (result) {
        models.deleteOrder(request.params.id);
        response.status(200).json({ status: 'success', message: 'Order has been deleted' });
      } else {
        response.status(404).json({ status: 'error', message: 'Order not found' });
      }
    });
  } else {
    response.status(401).json({ status: 'error', message: 'You are not authorized to perform this action' });
  }
};

/**
 * [postOrder posts an order. Both admins and users have access to this]
 * @param  {request} object
 * @param  {response}
 * @return {json}
 */
exports.postOrder = (request, response) => {
  if (request.body.userId && request.body.orderItems && request.body.amount) {
    if (parseInt(request.body.userId, 10) === parseInt(request.userId)){
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
      response.status(404).json({ status: 'error', message: 'unauthorized access' });
    }
  } else {
    response.status(400).json({ status: 'error', message: 'Invalid data' });
  }
};

/**
 * [updateOrder updates an order. Only admins can do this]
 * @param  {request} object
 * @param  {response}
 * @return {json}
 */
exports.updateOrder = (request, response) => {
  if (request.role === 'admin') {
   const { id } = request.params;
    if (request.body.orderItems) {
      request.body.order_items = JSON.stringify(request.body.orderItems);
      delete request.body.orderItems;
    }
    models.selectOrder(id, (result) => {
      if (result) {
        models.updateOrder(id, request.body);
        response.status(201).json({ status: 'success', message: 'Order has been Updated' });
      } else {
        response.status(404).json({ status: 'error', message: 'Order not found' });
      }
    });
  } else {
    response.status(401).json({ status: 'error', message: 'You are not authorized to perform this action' });
  }
};
