const Hapi      = require('hapi');
const port = process.env.PORT || 3300;
const server = new Hapi.Server();

server.connection({port:port,routes: { cors: true } });

const routes    = require('./private/routes');
server.register(require('hapi-auth-jwt2'), function (err) {
	if(err){
		console.log(err);
	} 
	server.route(routes);
	server.start();
});
console.log("Server active on port: "+ port);

