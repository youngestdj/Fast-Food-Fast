const mock = require('./mockdata.js');

const [mockData] = mock.mockData;

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World');
  });


  // Get all the orders

  app.get('/api/v1/orders', (req, res) => {
    res.send(mockData);
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
  app.post('/api/v1/orders/', (req, res) => {
    mockData.push(req.body);
    res.status(201).send(mockData);
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

  // Delete an specific order
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

module.exports = appRouter;
