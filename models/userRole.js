var mongoose = require('mongoose'),
	Schema = mongoose.Schema
 
var UserRole = new Schema({
	
	userRole: {type:String}

})

var userTask1 = mongoose.model('userRole', UserRole);
module.exports = userTask1;
