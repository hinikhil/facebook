//----- Mailer (otp) end 


//-------------------Modified 11----------------//
// exports.createProfile = function(req, res){
// console.log("req body of createProfile" + JSON.stringify(req.body));	 		
// console.log("Create Profile --> UserId : "+req.body.UserId);	
// 	var storeImage1Url	="";	
// 		var storeImage2Url	="";
// 			var storeImage3Url	="";
// 				var storeImage4Url	="";
// 	//IMAGE1---------------
// 	console.log("req.body.Image1 : " +req.body.Image1);
// 	if(typeof req.body.Image1!="undefined")
// 	{
// 	var Image1_base64 = req.body.Image1;
// 	binaryImage1Data = new Buffer(Image1_base64, 'base64');
// 	fs.writeFile("Image1.jpeg", binaryImage1Data, "binary", function (err) {
// 		                if(err){
// 			                console.log("error in writing file "+err);
// 		    	        }
// 	   			});
// 	}
// 	cloudinary.uploader.upload("Image1.jpeg",function(result) {	  
// 		storeImage1Url=result.url			
// 		console.log("Image1 in request.body : "+ req.body.Image1 +" and cloudinary url:"+result.url);
// 	//IMAGE2---------------
// 	if(typeof req.body.Image2!="undefined")
// 	{
// 	 var Image2_base64 = req.body.Image2;
// 	 binaryImage2Data = new Buffer(Image2_base64, 'base64');
// 	 fs.writeFile("Image2.jpeg", binaryImage2Data, "binary", function (err) {
// 	 	                if(err){
// 	 		                console.log("error in writing file "+err);
// 	 	    	        }
// 	    			});
// 	}
// 		cloudinary.uploader.upload("Image2.jpeg",function(result) {	  
// 			storeImage2Url=result.url			
// 			console.log("Image2 in request.body : "+ req.body.Image2 +" and cloudinary url:"+result.url);
// 	//IMAGE3---------------	
// 	if(typeof req.body.Image3!="undefined")
// 	{		
// 	var Image3_base64 = req.body.Image3;
// 	binaryImage3Data = new Buffer(Image3_base64, 'base64');
// 	fs.writeFile("Image3.jpeg", binaryImage3Data, "binary", function (err) {
// 		                if(err){
// 			                console.log("error in writing file "+err);
// 		    	        }
// 	   			});
// 	}
// 		cloudinary.uploader.upload("Image3.jpeg",function(result) {	  
// 			storeImage3Url=result.url			
// 			console.log("Image3 in request.body : "+ req.body.Image3 +" and cloudinary url:"+result.url);
// 	//IMAGE4---------------		
// 	if(typeof req.body.Image4!="undefined")
// 	{
// 	var Image4_base64 = req.body.Image4;	
// 	binaryImage4Data = new Buffer(Image4_base64, 'base64');
// 	fs.writeFile("Image4.jpeg", binaryImage4Data, "binary", function (err) {
// 		                if(err){
// 			                console.log("error in writing file "+err);
// 		    	        }
// 			});
// 	   	
// 	}
// 		cloudinary.uploader.upload("Image4.jpeg",function(result) {	  
// 			storeImage4Url=result.url			
// 			console.log("Image1 in request.body : "+ req.body.Image4 +" and cloudinary url:"+result.url);
// 			//update urls of request body before saving to Database with cloudinary urls
// 			req.body.Image1Url=storeImage1Url
// 			req.body.Image2Url=storeImage2Url	
// 			req.body.Image3Url=storeImage3Url	
// 			req.body.Image4Url=storeImage4Url
// 			//storing url in images
// 			// req.body.Image1=storeImage1Url
// 			// req.body.Image2=storeImage2Url	
// 			// req.body.Image3=storeImage3Url	
// 			// req.body.Image4=storeImage4Url
// 			//update password of request body with bcrypt hash
// 			// var bcryptPassword="";
// 			// if (typeof req.body.Password!="undefined" ){
// 			// bcrypt.hash(req.body.Password, 9, function(err, hash) {			
//    // 			bcryptPassword=hash;  			
// 			// });  //end of bcrypt scope
// 			// }   //end of if before bcrypt
// 			//console.log("bcryptPassword :" +bcryptPassword);
// 			//req.body.Password=bcryptPassword
// 	 	 	UserSchema.findOneAndUpdate({_id:req.body.UserId},req.body,{new:true}, function(err, updateResult){
// 		 	if(err){
// 			res.send({ResponseCode:400, ResponseMessage: "Error."});
// 			console.log(err);
// 		    }else if(updateResult!=null)
// 		    {
// 			//console.log("Create Profile Updated Rsult ------- > :" +updateResult);	
// 			var LastImage="";
// 			var LastImageUrl="";	
// 			// if(updateResult.Image4!=null)
// 			// {
// 			// 	LastImage=updateResult.Image4;
// 			// }
// 			// else if(updateResult.Image3!=null)
// 			// {
// 			// 	LastImage=updateResult.Image3;
// 			// }
// 			// else if(updateResult.Image2!=null)
// 			// {
// 			// 	LastImage=updateResult.Image2;
// 			// }
// 			// else if(updateResult.Image1!=null)
// 			// { 
// 			// 	LastImage=updateResult.Image1;
// 			// }

// 				if(updateResult.Image4!='')
// 			{
// 				LastImage=updateResult.Image4;
// 			}
// 			else if(updateResult.Image3!='')
// 			{
// 				LastImage=updateResult.Image3;
// 			}
// 			else if(updateResult.Image2!='')
// 			{
// 				LastImage=updateResult.Image2;
// 			}
// 			else if(updateResult.Image1!='')
// 			{ 
// 				LastImage=updateResult.Image1;
// 			}
// 			if(updateResult.Image4Url!=null)
// 			{
// 				LastImageUrl=updateResult.Image4Url;
// 			}
// 			else if(updateResult.Image3Url!=null)
// 			{
// 				LastImageUrl=updateResult.Image3Url;
// 			}
// 			else if(updateResult.Image2Url!=null)
// 			{
// 				LastImageUrl=updateResult.Image2Url;
// 			}
// 			else if(updateResult.Image1Url!=null)
// 			{ 
// 				LastImageUrl=updateResult.Image1Url;
// 			}
// 	  res.send({ResponseCode:200, ResponseMessage: "Profile Updated.", FeedList:updateResult, LastImage:LastImage ,LastImageUrl:LastImageUrl});
//       }
//       else
//       {
// 		res.send({ResponseCode:200, ResponseMessage: "No record Found"});
//       }
//  	}); //end of findOneAndUpdate
// 	     	});  //end of image4 cloudinary scope
// 			});  //end of image3 cloudinary scope
// 			});  //end of image2 cloudinary scope
// 			});  //end of image1 cloudinary scope
	

//  }
//------------------------ Modified 11 ----------------------//









 // 	exports.getLastImage=function(req,res){
 // 		if(!req.body.UserId){
 // 			return res.json({ResponseCode:400, ResponseMessage: "UserId is missing."})
 // 		}
 // 		UserSchema.findOne({_id:req.body.UserId}).exec(function(err, result){
 // 			if(err){
 // 				res.send({ResponseCode:400, ResponseMessage: "Error."});
 // 				console.log(err);
 // 			}
 // 			else	
 // 			{
 // 				console.log(result);
	// 		//result.Image is an array containing Images
	// 		//Objective : send last Image 
	// 		//Solution : find length of array and send Image(length-1) in response
	// 		var length=result.Images.length;
	// 		console.log("length="+length);
	// 		res.send({ResponseCode:200, ResponseMessage: "Success.",LastImage:result.Images[length-1]});
	// 		//res.send({ResponseCode:200, ResponseMessage: "Success"});
	// 	}
	// })
 // 	}







 // Delete User Details 
// exports.deleteUserDetails = function(req, res){
// 	console.log("req.body"+req.body);
// 	var _id = req.body.UserId;
// 	if(!_id){
// 		return res.json({ResponseCode:400, ResponseMessage: "UserId is missing."})
// 	}
	
// 	UserSchema.remove({_id:_id}).exec(function(err, user_info){
// 		if(err){
// 			res.send({ResponseCode:400, ResponseMessage: "Error"});
// 			console.log(err);
// 		}else{
// 			return res.json({ResponseCode:200,ResponseMessage: "Success"});
// 		}
// 	})
// }






// For Admin
// exports.getAll = function(req,res){
// 	console.log("req");
// 	UserSchema.findOne({_id:req.body.UserId}).exec(function(err, result){
//  		if(err){
//  			res.send({ResponseCode:400, ResponseMessage: "Error"});
//  			console.log(err);
//  		}
//  		else{
//  		//return res.json({ResponseCode:200, FeedList:user_info,ResponseMessage: "Success"});
//  		if(result.UserRole=='SuperAdmin')
//  		{
//  			UserSchema.find()
//  			.where('UserRole')
//  			.nin(['SuperAdmin'])
//  			.exec(function(err, user_info){
//  				if(err){
//  					return res.json({ResponseCode:400, ResponseMessage: "User not found."})
//  				}else{
//  					res.send({ResponseCode: 200, FeedList: user_info,ResponseMessage: "Success"});
//  				}
//  			})
//  		}else if(result.UserRole=='Admin'){
//  			UserSchema.find()
//  			.where('UserRole')
//  			.nin(['SuperAdmin','Admin'])
//  			.exec(function(err, user_info){
//  				if(err){
//  					return res.json({ResponseCode:400, ResponseMessage: "User not found."})
//  				}else{
//  					res.send({ResponseCode: 200, FeedList: user_info,ResponseMessage: "Success"});
//  				}
//  			})
//  		}else{
//  			res.send({ResponseCode: 400,ResponseMessage: "Invalid Login"});
//  		}
//  	}})
// }	