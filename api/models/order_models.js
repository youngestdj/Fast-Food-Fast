const database = require('./database.js');

const db = new database.Database();

const getAllOrders = (callback) => {
  const query = 'SELECT id, order_items, status, amount, user_id, time FROM orders';
  db.client.query(query)
    .then((result) => {
      callback(result.rows);
    });
};
const getUserOrders = (userId, callback) => {
  const query = `SELECT id, order_items, status, amount, user_id, time FROM orders WHERE user_id=${userId}`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows);
    });
};
const getSpecificOrder = (orderId, callback) => {
  const query = `SELECT id, order_items, status, amount, user_id, time FROM orders WHERE id=${orderId}`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows[0]);
    });
};
const selectOrder = (orderId, callback) => {
  const query = `SELECT id from orders WHERE id=${orderId}`;
  db.client.query(query)
    .then((result) => {
      callback(result.rows);
    });
};
const deleteOrder = (orderId) => {
  db.delete(orderId, 'orders');
};
const postOrder = (postBody) => {
  db.insert(postBody, 'orders');
};
const updateOrder = (orderId, data) => {
  db.update(orderId, data);
};
module.exports = {
  getAllOrders,
  getUserOrders,
  getSpecificOrder,
  deleteOrder,
  selectOrder,
  postOrder,
  updateOrder,
};
