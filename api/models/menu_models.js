const database = require('./database.js');

const db = new database.Database();

const addMenu = (data) => {
  db.insert(data, 'menu');
};

const getMenu = (callback) => {
  const query = 'SELECT id, food, price, quantifier FROM menu';
  db.client.query(query)
    .then((result) => {
      if (result.rows) {
        callback(result.rows);
      } else {
        callback(false);
      }
    });
};

const checkMenu = (food, callback) => {
  const query = `SELECT food FROM menu WHERE food='${food}'`;
  db.client.query(query)
    .then((result) => {
      if (result.rows[0]) {
        callback(true);
      } else {
        callback(false);
      }
    });
};

module.exports = {
  addMenu, getMenu, checkMenu,
};
