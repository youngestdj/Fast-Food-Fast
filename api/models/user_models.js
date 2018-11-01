const database = require('./database.js');

const db = new database.Database();

exports.getUser = (id, callback) => {
	const query = `SELECT id, email, firstname, lastname, role from users where id=${id}`;
	db.client.query(query)
	  .then((result) => {
	  	if(result.rows) {
	  		callback(result.rows[0]);
	  	} else {
	  		callback(false);
	  	}
	  });
};