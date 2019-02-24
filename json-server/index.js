const jsonServer = require('json-server');
const server = jsonServer.create();
const middleware = jsonServer.defaults();
const init = require('../json-server/services');
const walk = require('../json-server/utils/walk');
const cors = require('../json-server/utils/cors');

let ang;

walk('./json-server/services', function (err, results) {
	if (err) {
		console.log(err);
	} else {
		ang = init(results);

		server.use(cors);

		server.use(jsonServer.bodyParser);
		server.use(middleware);

		//
		server.use(ang.routes);
		server.use(ang.middleware);
		server.use(ang.db);

		server.listen(3004, function () {
			console.log('JSON Server is running on 3004');
		});
	}
});
