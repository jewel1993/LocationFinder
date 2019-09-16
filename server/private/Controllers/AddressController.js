var request = require('request');
var mongoose = require('mongoose');
require('../models/AddressModel');
var address_schema = mongoose.model('address');
var GoogleMapAPIKey=require('../../config').GoogleMapAPIKey;


module.exports.getAddress = function (req, res) {
	var query=req.payload.address;
	addresses=[];
	request('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key='+GoogleMapAPIKey, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		 var data=JSON.parse(body);
		 if(data.results.length>0)
		 {
			for (i = 0; i < data.results.length; i++) {
				var placeId=data.results[i].place_id;
				request('https://maps.googleapis.com/maps/api/place/details/json?place_id='+placeId+'&key='+GoogleMapAPIKey, function (error2, response2, body2) {
					 if (!error2 && response2.statusCode == 200) {
						 var data2=JSON.parse(body2);
						 if(data2.hasOwnProperty('result') && data2.result.hasOwnProperty('address_components'))
						 {
							 var address=new address_schema();
							 for (k = 0; k < data2.result.address_components.length; k++) {
								 if(data2.result.address_components[k].types.indexOf("country") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.country=data2.result.address_components[k].long_name;
								 }
								 if(data2.result.address_components[k].types.indexOf("administrative_area_level_1") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.state=data2.result.address_components[k].long_name;
								 }
								 if(data2.result.address_components[k].types.indexOf("administrative_area_level_2") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.city=data2.result.address_components[k].long_name;
								 }
								 if(data2.result.address_components[k].types.indexOf("neighborhood") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.street=data2.result.address_components[k].long_name;
								 }
								 else if(data2.result.address_components[k].types.indexOf("sublocality_level_1") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.street=data2.result.address_components[k].long_name;
								 }
								 else if(data2.result.address_components[k].types.indexOf("locality") > -1 && data2.result.address_components[k].hasOwnProperty('long_name'))
								 {
									 address.street=data2.result.address_components[k].long_name;
								 }
								 if(data2.result.hasOwnProperty('geometry') && data2.result.geometry.hasOwnProperty('location') && data2.result.geometry.location.hasOwnProperty('lat') && data2.result.geometry.location.hasOwnProperty('lng'))
								 {
									address.lat=data2.result.geometry.location.lat;
									address.lon=data2.result.geometry.location.lng;
								 }
							 }
							 addresses.push(address);
							 if ( addresses.length == data.results.length) {
								 return res({"addresses":addresses}).code(200);
							 }
						 }
					 }
				});
			}
		 }
	  }
	  else {
		 return res("Failed, try again").code(400);
	  }
	});
}


module.exports.index = function (req, res) {
	return res("This is demo application to search location").code(200);
}