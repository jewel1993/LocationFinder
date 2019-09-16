var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var address_schema  = new Schema({
    street:     {type: String, default: null},
    city: 		{type: String, default: null},
	state : 	{type: String, default: null},
	country :   {type: String, default: null},
	lat: 		{type: Number, default: null},
	lon:		{type: Number, default: null}
});
module.exports = mongoose.model('address', address_schema);