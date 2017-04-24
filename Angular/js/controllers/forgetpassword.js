

app.controller('forgetpasswordCtrl',function($scope, $rootScope,$window, $state, myService) {


//$scope.email1 = "";
$scope.user = {};

	$scope.forgetpassword = function(){
		$state.go('forgetpassword')

		var data = {
			"email":$scope.email
	}
	
myService.pqr = $scope.email;
console.log(JSON.stringify(data));

		myService.postMethod(data,'forgetPassword').then(function(objS){
			console.log('success:    '+JSON.stringify(objS))
			if(objS.code==200){
			alert("OTP send on your email.")
		}
		else
		{
			alert('user not found.');
		}
			// $location.path('/info');	
		},function(objE){
			console.log('error:    '+JSON.stringify(objE));
		});
	}

$scope.verify= function(){
	var data ={
		"otp":$scope.OTP,
		"email":myService.pqr
	}
myService.postMethod(data,'verifyOtp').then(function(objS){


		if(objS.code==200){
			alert("OTP are verified.")
			$state.go("updatePwd")
		}
		else
		{
			alert('Incorrect OTP.');
		}
			// $location.path('/info');	
		},function(objE){
			console.log('error:    '+JSON.stringify(objE));
		});
	}




})