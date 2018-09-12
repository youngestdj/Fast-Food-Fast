'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var appRouter = function appRouter(app) {
  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  // Some mock data
  var mockData = [{
    name: 'Jessam Joyson',
    date: 'Aug 24',
    order: {
      rice: 200,
      beans: 100,
      turkey: 300
    }
  }, {
    name: 'Adesare Olagbagi',
    date: 'Aug 25',
    order: {
      Amala: 300,
      Ewa: 100,
      dodo: 50
    }
  }, {
    name: 'John Wick',
    date: 'Aug 30',
    order: {
      Jollof: 200,
      beans: 100,
      Chicken: 300
    }
  }];

  // Get all the orders

  app.get('/api/v1/orders', function (req, res) {
    res.send(mockData);
  });

  // Get a specific order
  app.get('/api/v1/orders/:id', function (req, res) {
    var _req$params$id = _slicedToArray(req.params.id, 1),
        id = _req$params$id[0];

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
  app.post('/api/v1/orders/', function (req, res) {
    mockData.push(req.body);
    res.status(201).send(mockData);
  });

  // Update an existing order
  app.put('/api/v1/orders/:id', function (req, res) {
    var _req$params$id2 = _slicedToArray(req.params.id, 1),
        id = _req$params$id2[0];

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

  // Delete an specific order
  app.delete('/api/v1/orders/:id', function (req, res) {
    var _req$params$id3 = _slicedToArray(req.params.id, 1),
        id = _req$params$id3[0];

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

module.exports = appRouter;