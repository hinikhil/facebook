
app.controller('ListUsersSuperAdminCtrl', function($scope, $window,  $state,ListUsers) {
    $(window).scrollTop(0, 0);

$scope.isVisible = true; // will hide div

var input

 var localParentFirstName= localStorage.getItem("FirstName");

    ListUsers.ListUsersSuperAdmin().success(function(res) {
        if (res.ResponseCode == 200) {
        	

           $scope.currentPage = 0;
            $scope.pageSize = 10;


             
            var count=Object.keys(res.FeedList).length;

            console.log("count"+count);

            $scope.numberOfPages=function(){
                return Math.ceil(count/$scope.pageSize);                
            }


            $scope.ListOfUsers = res.FeedList;
            $scope.listView=res.FeedList;
    
            //console.log("List =====>" + JSON.stringify(res))         
        

        } 
        else if (res.ResponseCode == 400) {
        alert(res.responseMessage);
        }
    }).error(function(status, data) {
    })


    $scope.delete = function(UserId) {       
         var data = {
            "UserId":UserId
            }
            

        ListUsers.DeleteUserSuperadminOrAdmin(data).success(function(res) {

            if (res.ResponseCode == 200) {
                //Display rest of users after deletion
               
                ListUsers.ListUsersSuperAdmin().success(function(res) {
                    $scope.ListOfUsers = res.FeedList

                         $state.go('ListUsersSuperAdmin');

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


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
