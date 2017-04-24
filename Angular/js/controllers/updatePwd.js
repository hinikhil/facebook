
app.controller('updatePwdCtrl',function($scope, $rootScope,$window, $state, myService) {
  
 	$scope.update = function(){

		var data = {
			"pass":$scope.pass,
			"email":myService.pqr
	}

console.log(JSON.stringify(data));

		myService.postMethod(data,'updatePwd').then(function(objS){
			console.log('success:    '+JSON.stringify(objS))
			if(objS.code==200){

			alert('You have successfully changed your password.');
			$state.go("login")
		}
		else
		{
			alert('Invalid password.');
		}
			// $location.path('/info');	
		},function(objE){
			console.log('error:    '+JSON.stringify(objE));
		});
	}

 })