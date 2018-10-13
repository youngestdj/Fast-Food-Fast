const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./api/routes/routes.js')(app);
require('./api/routes/order_routes.js')(app);
require('./api/routes/signup_routes.js')(app);
require('./api/routes/login_routes.js')(app);
require('./api/routes/menu_routes.js')(app);

if (require.main === module) {
	app.listen(process.env.PORT || 3001);
}
else {
	module.exports = {
		app,
	};
}
