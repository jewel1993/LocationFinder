var request = require('request');
var mongoose = require('mongoose');
require('./AddressModel');
var NodeGeocoder = require('node-geocoder');
var address_schema = mongoose.model('address')


module.exports.getAddress = function (req, res) {
	var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDOgf5-9Hee3cljNVcP8WssIT6OgDtB73U', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
	var geocoder = NodeGeocoder(options);
 
// Using callback
geocoder.geocode('bar', function(err, response) {
  console.log(response);
});
	
	/*
	var key='AIzaSyD2Sfxv2-3_ra2LZ7VSsPQDKMlTk8Va1kI';
	var query='bar';
	addresses=[];
	console.log(addresses);
	/*
	request('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key='+key, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 var data=JSON.parse(body);
		 if(data.results.length>0)
		 {
			for (i = 0; i < data.results.length; i++) {
				var address=new address_schema();
				address.street=formatted_address;
				
			}
		 }
	  }
	  else {
		 return res("Failed, try again").code(400);
	  }
	});
	*/
	return res("Failed, try again").code(400);
}