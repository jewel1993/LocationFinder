var request = require('request');
var mongoose = require('mongoose');
require('./AddressModel');
var NodeGeocoder = require('node-geocoder');
var address_schema = mongoose.model('address')


module.exports.getAddress = function (req, res) {
	console.log(req.param);
	var addresses=[
		{"street":"23 bark street","city":"Colosseum of Rome","state":"Rome","country":"Italy","lat":"41.9028","lon":"12.4964"},
		{"street":"23 bark street","city":"Colosseum of Rome","state":"Rome","country":"Italy","lat":"41.9028","lon":"12.4964"}
	];
	
	
	return res({"addresses":addresses}).code(200);
}