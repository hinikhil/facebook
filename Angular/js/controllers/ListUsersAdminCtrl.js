app.controller('ListUsersAdminCtrl', function($scope, $window,  $state,ListUsers) {
    $(window).scrollTop(0, 0);

    $scope.isVisible = false; // will hide div

   var localParentFirstName= localStorage.getItem("fullName");

    ListUsers.ListUsersAdmin().success(function(res) {
        if (res.ResponseCode == 200) {
        	
            $scope.currentPage = 0;
            $scope.pageSize = 5;
             
            var count=Object.keys(res.List).length;

            console.log("count"+count);

            $scope.numberOfPages=function(){
                return Math.ceil(count/$scope.pageSize);                
            }

                $scope.ListOfUsers = res.List;
                $scope.listView=res.List;               
            //console.log("List =====>" + JSON.stringify(res))         
        } 

        else if (res.ResponseCode == 400) {
        alert(res.responseMessage);
        }
    }).error(function(status, data) {
    })


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

    $scope.delete = function(UserId) {       
         var data = {
            "UserId":UserId
            }
           
        ListUsers.deleteUsers(data).success(function(res) {
            if (res.ResponseCode == 200) {
             
                ListUsers.ListUsersAdmin().success(function(res) {
                    $scope.ListOfUsers = res.List

                  
                     $state.go('ListUsersAdmin');
                

                }).error(function(status, data) {
                })
            } 
            else if (res.ResponseCode == 400) {
                alert(res.responseMessage);
            }
                
        }).error(function(status, data) {
        })
    }


})
