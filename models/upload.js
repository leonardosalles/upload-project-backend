var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var uploadSchema = new Schema({
	id: 		{ type: String },
	name: 		{ type: Number },
	image1: 	{ type: String },
	image2:  	{ type: String },
});


module.exports = mongoose.model('Upload', uploadSchema);
