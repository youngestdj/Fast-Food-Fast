const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./api/routes/routes.js')(app);
require('./api/routes/signup_routes.js')(app);
require('./api/routes/order_routes.js')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Listening on port %s...', server.address().port);
});
