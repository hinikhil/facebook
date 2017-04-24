app.controller('LoginCtrl', function($scope, $window, $state, ListUsers) {

    $(window).scrollTop(0, 0);


    $scope.login = function() {
            var data = {
            "email":$scope.Email,
            "password":$scope.Password
            }            
        console.log("email : "+data.email + " password : "+data.password);

        ListUsers.Login(data).success(function(res) {

            console.log("ResponseCode : "+res.ResponseCode );

            if (res.ResponseCode == 200) {

                alert(res.ResponseMessage);  

                if(res.userType =="Admin")
                {  
                    localStorage.setItem("UserName",res.fullName);
                    //localStorage.setItem("FirstName",res.FirstName);

                     $state.go('ListUsersAdmin')
                }
                 else if(res.UserRole=="")
                {
                      localStorage.setItem("UserRole","Admin");
                       //localStorage.setItem("FirstName",res.FirstName);

                     $state.go('ListUsersAdmin')
                }
            

            } else if (res.ResponseCode == 400) {
                alert(res.ResponseMessage);
            }
        }).error(function(status, data) {
        })
    }
})
