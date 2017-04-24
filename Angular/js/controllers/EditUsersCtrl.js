app.controller('EditUsersCtrl', function($scope, $window, ListUsers,  $state,$stateParams) {
    $(window).scrollTop(0, 0);  

    var UserId = $stateParams.id;
    console.log("Id====>>>" + UserId)
        var data = {
            "UserId":UserId
            }
    ListUsers.editUser(data).success(function(res) {
        if (res.ResponseCode == 200) {
              $scope.editFirstName = res.FeedList.FirstName
              $scope.editLastName = res.FeedList.LastName
              $scope.editUserRole = res.FeedList.UserRole
              $scope.editEmail = res.FeedList.Email
              $scope.editAddress = res.FeedList.Address
              $scope.editStatus = res.FeedList.Status
              console.log("$scope.Address" + JSON.stringify(res.FeedList.Address))
        } else if (res.responseCode == 400) {
            alert(res.responseMessage);
        }
    }).error(function(status, data) {
    })
    $scope.saveChanges=function(){
          var UserId = $stateParams.id;
          var FirstName =   $scope.editFirstName ;
          var LastName =   $scope.editLastName ;
          var UserRole =   $scope.editUserRole ;
          var Email =   $scope.editEmail ;
          var Address =   $scope.editAddress ;
          var Status =   $scope.editStatus ;
          
          var data = {
            "UserId":UserId,
            "FirstName":FirstName,
            "LastName":LastName,
            "UserRole":UserRole,
            "Email":Email,
            "Address":Address,
            "Status":Status
            }
            console.log("data is : " +data)
    	ListUsers.editUsersDetailsSuperadminOrAdmin(data).success(function(res) {

        if (res.ResponseCode == 200) {

            console.log("res.UserRole is : " +res.UserRole)

            var localParentUserRole= localStorage.getItem("UserRole");
          
           if(localParentUserRole=="SuperAdmin")
                {

                     $state.go('ListUsersSuperAdmin')
                }
                 else if(localParentUserRole=="Admin")
                {

                     $state.go('ListUsersAdmin')
                }
        }

         else if (res.ResponseCode == 400) {
            console.log("error");
        }


    }).error(function(status, data) {
    })
    }
})
