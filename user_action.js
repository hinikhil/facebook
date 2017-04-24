var express = require('express'),
app = express(),
bodyParser =  require('body-parser'),
UserSchema = require('./models/usertask1'),
config = require('./config'),
jwt = require('jsonwebtoken');
	//---------OTP MODIFY
	var nodemailer = require('nodemailer');  
    var fs = require('fs');
    var config = require('./config');
    var cloudinary = require('cloudinary');
    var bcrypt = require('bcrypt');

exports.login = function(req, res){
	console.log("login : "+req.body.email+" password : "+ req.body.password);
	 //a) email field not empty
	 if(req.body.email=='')
	 	return res.json({ResponseCode:401, ResponseMessage:"Email field is empty"})
	// //  //b) password field not empty
	 if(req.body.password =='')
	 	return res.json({ResponseCode:401, ResponseMessage:"Password field is empty"})

	// // //c) check Valid email

	// var emailPattern = (/^([a-zA-Z0-9@*#]{8,15})$/);
	// 	return res.json({ResponseCode:401, ResponseMessage:"Not a valid email"})

	//d) check strong password
	//    var passwordPattern=(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
	// 	//^		     				Start anchor
	// 	//(?=.*\d)                  should contain at least one digit
	// 	//(?=.*[a-z])               should contain at least one lower case
	// 	//(?=.*[A-Z])               should contain at least one upper case
	// 	//[a-zA-Z0-9]{8,}           should contain at least 8 from the mentioned characters
	// 	//$							End anchor
	// if(!passwordPattern.test(req.body.password))	
	// 	return res.json({ResponseCode:401, ResponseMessage:"Not a strong password"})

 	 UserSchema.findOne({email:req.body.email}, function(err, user_login_info){
 	 	if(err){
 	 		return res.json({ResponseCode:401, ResponseMessage:"Server error."})
 	 	}else if(!user_login_info){
 	 		return res.json({ResponseCode:401, ResponseMessage: "Incorrect email"})
 	 	}else{
			//email database me mil gaya ..now match password using bcrypt.compare
			bcrypt.compare(req.body.password, user_login_info.password, function(err, result) {
    		// res == true 
    		if(result)
    		{
    			res.send({ResponseCode: 200, ResponseMessage:"Login Successful.",UserId:user_login_info._id,userType:user_login_info.userType,fullName:user_login_info.fullName});

    		}
    		else {
    			res.send({ResponseCode: 400, ResponseMessage:"Incorrect Password"});
    		}			
			});	//end of bcrypt scope			
		}
	})
 	}

 	exports.userSignup = function(req, res){
	console.log("req body of userSignUp ", JSON.stringify(req.body)); 
	 //a) email field not empty
	 if(req.body.email == '')
	 	return res.json({ResponseCode:401, ResponseMessage:"email field is empty"})
	// //  //b) password field not empty
	 if(req.body.password == '')
	 	return res.json({ResponseCode:401, ResponseMessage:"password field is empty"})
	 
	 if(typeof req.body.userType == 'undefined')
	 	return res.json({ResponseCode:401, ResponseMessage:"UserType is Required"})

	// // //c) check Valid email

	// var emailPattern = (/^([a-zA-Z0-9@*#]{8,15})$/);
	// 	return res.json({ResponseCode:401, ResponseMessage:"Not a valid email"})

	//d) check strong password
	   var passwordPattern=(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
		//^		     				Start anchor
		//(?=.*\d)                  should contain at least one digit
		//(?=.*[a-z])               should contain at least one lower case
		//(?=.*[A-Z])               should contain at least one upper case
		//[a-zA-Z0-9]{8,}           should contain at least 8 from the mentioned characters
		//$							End anchor
	if(!passwordPattern.test(req.body.password))	
		return res.json({ResponseCode:401, ResponseMessage:"Not a strong password"})

	UserSchema.findOne({email:req.body.email},function(err,result){
		if(err){

			 return res.json({ResponseCode:401, ResponseMessage: "Server Error."})
		}
		else if(result){
   					//email found
   				   res.send({ResponseCode: 401, ResponseMessage:"email already exists"});
   				}
   				else{
   						//email not found...save
   						var bcryptPassword="";	
   						bcrypt.hash(req.body.password, 9, function(err, hash) {
 			 			// Store hash in your password DB. 
			 			 bcryptPassword=hash;
			 			 req.body.password=bcryptPassword;
			 			 console.log("bcryptPassword :" +bcryptPassword)
			 			 var userSchema = new UserSchema(req.body);
			 			 userSchema.save(function(err, resultUser){
			 			 	if(err){
			 			 			
			 			 		res.send({ResponseCode:400, ResponseMessage: "Error."});
			 			 		console.log(err);
			 			 	}
			 			 	else{
			 			 			
			 			 		res.send({ResponseCode: 200, ResponseMessage:"Success.", UserId:resultUser._id, userRole:resultUser.userRole});
			 			 	}
			 			 });

						}); // end of bcrypt scope
   					}
   				}) //end of findOne scope
}


exports.getAll = function(req,res){
 			UserSchema.find()
 			.where('userType')
 			.nin(['Admin'])
 			.exec(function(err, user_info){
 				if(err){
 					return res.json({ResponseCode:400, ResponseMessage: "User not found."})
 				}else{
 					res.send({ResponseCode: 200, List: user_info,ResponseMessage: "Success"});
 				}
 			})
}


exports.editUser = function(req, res){
		//admin will send the details in body and we will update it
		//admin will not send Images so no need to store them in database or cloudinary hence removed that code
		//no need to return Feedlist..just return ResponseCode:200, ResponseMessage: "Profile Updated."
	 		console.log("req body of " + JSON.stringify(req.body));	 
	 		console.log("modify Profile --> UserId : "+req.body.UserId);	
	 	 	UserSchema.findOneAndUpdate({_id:req.body.UserId},req.body,{new:true}, function(err, updateResult){
		 	if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error."});
			console.log(err);
		    }else if(updateResult!=null)
		    	{
			res.send({ResponseCode:200, ResponseMessage: "Profile Updated.",UserRole:updateResult.UserRole});
    		  }
    		  else
    		  {
			res.send({ResponseCode:200, ResponseMessage: "No record Found"});
      }
 	})
 }


 exports.fillDetails = function(req, res){
 	console.log(" FillDetails req.body 1 =========: "+req.body.UserId);
 	var _id = req.body.UserId;
 	if(!_id){
 		return res.json({ResponseCode:400, ResponseMessage: "Id is missing."})
 	}
 	UserSchema.findOne({_id:_id})
 	.exec(function(err, user_info){
 		if(err){
 			res.send({ResponseCode:400, ResponseMessage: "Error"});
 			console.log(err);
 		}else{
 			return res.json({ResponseCode:200, UserInfo:user_info, ResponseMessage: "Success"});
 		}
 	})
 }

exports.deleteUsers = function(req, res){
	console.log("In DeleteUser req.body"+req.body);
	var _id = req.body.UserId;
	if(!_id){
		res.send({ResponseCode:400, ResponseMessage: "UserId is missing."})
	}	
	UserSchema.findOneAndUpdate({_id:_id},{$set:{Status:'Inactive'}},{new:true}, function(err, updateResult){
		if(err){
			res.send({ResponseCode:400, message: "Interal Server Error."});
			console.log(err);
		}else{
			 res.send({ResponseCode:200, message:"User Deleted Successfully."});
		}
	})	
}

//----------------which is not existed---------------//

//---------------addRole-------------------//
 exports.addRole = function(req, res){
	console.log("req body of userSignUp--", JSON.stringify(req.body));
	var usertask1 = new usertask1(req.body.userType);
	userSchema.save(function(err, resultUser){
		if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error"});
			console.log(err);
		}
		else{
			
			res.send({ResponseCode: 200, ResponseMessage:"Success",userType:resultUser.userType});
		}
	});
}


//---------------editRole------------------//
exports.editRole = function(req, res){
		//admin will send the details in body and we will update it
		//admin will not send Images so no need to store them in database or cloudinary hence removed that code
		//no need to return Feedlist..just return ResponseCode:200, ResponseMessage: "Profile Updated."
	 		console.log("req body of " + JSON.stringify(req.body));	 
	 		console.log("modify Profile --> userRole : "+req.body.userType);	
	 	 	UserSchema.findOneAndUpdate({userType:req.body.userType},{$set:{userType:req.body.newType}},{new:true}, function(err, updateResult){
		 	if(err){
			res.send({ResponseCode:400, ResponseMessage: "Error."});
			console.log(err);
		    }else if(updateResult!=null)
		    	{
			res.send({ResponseCode:200, ResponseMessage: "Profile Updated.",UserRole:updateResult.UserRole});
    		  }
    		  else
    		  {
			res.send({ResponseCode:200, ResponseMessage: "No record Found"});
      }
 	})
 }

//---------------deleteRole----------------//
exports.deleteRole = function(req, res){
	console.log("In DeleteRole req.body.userType  :"+req.body.userType);
	var userType = req.body.userType;
	if(!userType){
		res.send({ResponseCode:400, ResponseMessage: "UserRole is missing."})
	}	
	UserSchema.findOneAndUpdate({userType:userType},{$set:{status:'Inactive'}},{new:true}, function(err, updateResult){
		if(err){
			res.send({ResponseCode:400, message: "Interal Server Error."});
			console.log(err);
		}else{
			 res.send({ResponseCode:200, message:"UserRole Deleted Successfully."});
		}
	})	
}

//---------get role Types----------//

exports.getRoleTypes = function(req,res){
 			UserSchema.find()
 			.where('userType')
 			.exec(function(err, user_info){
 				if(err){
 					return res.json({ResponseCode:400, ResponseMessage: "User not found."})
 				}else{
 					res.send({ResponseCode: 200, userType: user_info,ResponseMessage: "Success"});
 				}
 			})
}


//----- Mailer (otp) start
exports.forgetPassword = function(req,res){
	console.log("="+req.body.email);
	if(!req.body.email){
		res.json({code:400,message:"Please enter valid email Id."})
	}
	else
	{
		UserSchema.findOne({email:req.body.email},function(err,data){
			if(err){
				throw err;
			}
			else if(!data){
				res.json({code:400, message:"Email Id Dose't Exist."})
			}else{
				var smtpTransport = nodemailer.createTransport({
					   service: "Gmail",
					   auth: {
					   	user: "nj7870@gmail.com",
					   	pass: "Nikhil.1"
					   }
					});
				var text="";
				var otppossible ="1234567890asdfasdff";
				for(var i=0;i<5;i++)
				{
					text += otppossible.charAt(Math.floor(Math.random() * otppossible.length));

				}
				console.log("otp---",text);
					smtpTransport.sendMail({  //email options
						from: "nikhil9839181726@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
						to: req.body.email, // receiver
						subject: "Forget password otp", // subject
						text: "Your otp is "+ text // body
						}, function(error, response){  //callback
							if(error){
								console.log(error);
								res.send({code:400, message:error})
							}else{
							//res.send({code:200, message:"mail sent."})
							data.otp = text;
							data.otpStatus = "otpSend";
							data.save(function(err,data){
								if(err){
									return res.json({code:400,message:"not found"})
								}else{
									return res.json({code:200,data:data})
								}
							})
						}
					});
				}
			})
	}
}
exports.verifyOtp= function(req,res){
	if(!req.body.otp){
		return res.json({code:400,message:"Please Enter OTP First."})
	}
	else
	{
		UserSchema.findOne({email:req.body.email},{Password:0},function(err,result)
		{
			if(err)
			{
				res.json({code:400,message:"Server Error."});
			}
			else
			{
				if(result.otp==req.body.otp)
				{
					result.otpStatus="verfied";
					result.save(function(err,result)
					{
						if(err)
						{
							res.json({code:400,message:"Data Not Found."});
						}
						else
						{
							res.json({code:200,message:"OTP Veified."});
						}

					});
				}
				else
				{
					res.json({code:401,message:"Incorrect OTP."})
				}
			}
		})
	}
}

exports.updatePwd = function(req,res){
	UserSchema.findOneAndUpdate({email:req.body.email},{$set:{password:req.body.password}},{new:true}, function(err, updateResult){
		if(err){
			res.send({code:400, message: "Interl Server Error."});
			console.log(err);
		}else{
			return res.json({code:202, message:"password Updated.",password:req.body.password});
		}
	})

}
//----Mail----//

