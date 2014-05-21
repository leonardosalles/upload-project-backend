var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	id: 		{ type: String },
	password:	{ type: Number },
	level: 		{ type: String, enum : ['admin', 'comum']},
});

module.exports = mongoose.model('User', userSchema);
