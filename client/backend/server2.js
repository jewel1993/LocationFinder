const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);


const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3300;
var request = require('request');

// Morgan middleware for logging
app.use(morgan('dev'));


// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
  });

//Body parser middleware to auto-parse request body to JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	console.log(res.body.data);
	res.send('Hello from Express!');
});

app.post('/getAddress2', (req, res) => {
	var key='AIzaSyD2Sfxv2-3_ra2LZ7VSsPQDKMlTk8Va1kI';
	var query=req.body.address;
	if(req.body.address!=undefined){
		request('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key='+key, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		  }
		  else {
			res.json(error);
		  }
		});
	}
	else {
		res.status(400).send("address parameter not found");
	}
});

var routes = require('./private/routes');
app.use('/', routes);

//Run the server
server.listen(port, () => {
    console.log('Server active on port: %d', port);
});