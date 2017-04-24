
app.controller('SignupCtrl', function($scope,$window, $state, ListUsers) {

    $(window).scrollTop(0, 0);

   // $scope={}; --> this will make every model element of view as null so dont do it
 
    $scope.signup = function(){
          var FirstName =   $scope.modelFirstName ;
          var UserRole =   $scope.modelUserRole ;
          var Email =   $scope.modelEmail ;
          var Status =   "Active" ;
          var Password =   $scope.modelPassword ;

          var data = {
            "fullName":FirstName,
            "userType":UserRole,
            "email":Email,
            "status":Status,
            "password":Password
            }
            console.log("data is : " +data)

      ListUsers.Signup(data).success(function(res) {
          
        if (res.ResponseCode == 200) {
          alert("Sign up successful");
            $state.go('Login')
               
        }

         else if (res.ResponseCode == 400) {
            console.log("error");
        }


    }).error(function(status, data) {
    })

        
	
    }

})
