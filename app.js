const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./api/routes/routes.js')(app);

const server = app.listen(3001, () => {
  console.log('Listening on port %s...', server.address().port);
});
