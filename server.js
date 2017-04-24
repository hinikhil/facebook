
var express = require('express'),
    app = express(),
    bodyParser =  require('body-parser'),
    config = require('./config'),
    mongoose = require('mongoose'),
    user_action = require('./user_action')
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db);

//cloudinary
var cloudinary = require('cloudinary');

//Setting Cloudinary configuration
          cloudinary.config({ 
         'cloud_name': config.cloudinary_cloud_name, 
         'api_key': config.cloudinary_api_key, 
         'api_secret': config.cloudinary_api_secret
   });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json({
    limit: '500mb'
}));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 5000000
}));

app.use(express.static('Angular'));
app.post('/signup',user_action.userSignup);//(done) 
app.post('/login',user_action.login);// login of the user.(done)

app.put('/deleteUsers',user_action.deleteUsers);// delete the user(done)
app.post('/fillDetails',user_action.fillDetails);//show details of the user.(send Role Data (Singile Person))(done)
app.post('/editUser',user_action.editUser);// edit the user detais of the user.(Done)
app.post('/listUsers',user_action.getAll);// for list of users without Admin.(done)

app.post('/getRoleTypes',user_action.getRoleTypes);//to show all role types(done)

app.post('/addRole',user_action.addRole)//add new role()// Problem is with adding User.

app.post('/editRole',user_action.editRole);//edit new role(done)
app.put('/deleteRole',user_action.deleteRole);//delete role(done)


//Forget Password Collection.
app.post('/forgetPassword',user_action.forgetPassword);//done
app.post('/verifyOtp',user_action.verifyOtp);//done
app.post('/updatePwd',user_action.updatePwd);//done


// start the server
app.listen(config.port,function(){
    console.log("welcome to the node.js world" +config.port);
});
