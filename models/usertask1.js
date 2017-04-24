var mongoose = require('mongoose'),
	Schema = mongoose.Schema
 
var bcrypt = require('bcrypt');
var UserTask1 = new Schema({


	fullName:{type:String,default:'',maxLength:'40'},
	companyName:{type:String,default:'',maxLength:'40'},
	companyImage:{type:String, default:''},
	address:{type:String, default:''},
	contactNumber:{type:Number},
	email:{type:String, maxlength:'254'},
	paymentInfo:{type:Number},
	userType: {type:String},
	password:{type:String, maxlength:'100'},
	profileImage:{type:String, default:''},
	jobs:{type:Number,default:''},
	otp:{type:String},
	otpStatus:{type:String, default:""},
	status:{type:String,default:"Active"}


})

var userTask1 = mongoose.model('userTask1', UserTask1);
module.exports = userTask1;
// ------- For Admin Creation ---------// 
var adminCreation = mongoose.model('userTask1', UserTask1);
var admin;
var autoInvoke = function(){
	adminCreation.findOne({email:"nikhil@gmail.com"},function(err, data){
		if(err){
			throw err;admin
		}
		else if(data!=null){
			
			console.log('Admin admin already created');
			
		}
		else{
				var bcryptPassword="";

			bcrypt.hash("1Aaaaaaa", 9, function(err, hash) {
 			
   			bcryptPassword=hash;

			admin = adminCreation({email:"nikhil@gmail.com", password:bcryptPassword, userType:"Admin", fullName:"nikhil"});
			admin.save(function(err, data){
				if(err){
					console.log(err);
				}
				else{
					console.log('Admin created successfully');
				}
			})
		}) //end of bcrypt scope

		}
	})
};
autoInvoke();