  app.controller('AddAdminCtrl', function($scope, $window, ListUsers,  $state,$stateParams) {
    $(window).scrollTop(0, 0);  

     $scope.modelUserRole ="Admin";

    $scope.saveChanges=function(){
       
          var FirstName =   $scope.modelFirstName ;
          var LastName =   $scope.modelLastName ;
          var UserRole =   $scope.modelUserRole ;
          var Email =   $scope.modelEmail ;
          var Password =   $scope.modelPassword ;

            
          
          var data = {
            "FirstName":FirstName,
            "LastName":LastName,
            "UserRole":UserRole,
            "Email":Email,
            "Status":"Active",
            "Password":Password
            }
            console.log("data is : " +data)

    	ListUsers.AddAdminDetailsSuperAdmin(data).success(function(res) {
          
        if (res.ResponseCode == 200) {

          
             alert("Admin added successful");

            var localParentUserRole= localStorage.getItem("UserRole");

            console.log("localParentUserRole is : " +localParentUserRole)

          
           if(localParentUserRole=="SuperAdmin")
                {

                     $state.go('ListUsersSuperAdmin')
                }
                 else if(localParentUserRole=="Admin")
                {

                     $state.go('ListUsersAdmin')
                }
        }

          else if(res.ResponseCode == 201){
          alert(res.ResponseMessage);

        }

         else if (res.ResponseCode == 400) {
            console.log("error");
        }

    }).error(function(status, data) {
    })
    }
})
