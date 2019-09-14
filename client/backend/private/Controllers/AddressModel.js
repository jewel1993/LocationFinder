var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var address_schema  = new Schema({
    street:     String,
    city: 		String,
	state : 	String,
	country :   Number,
	lat: 		Number,
	lon:		Number
});
module.exports = mongoose.model('address', address_schema);