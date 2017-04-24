
app.service('ListUsers',function($http){
this.myForm={};
	return{

    //BOTH ADMIN AND SUPERADMIN
    Login: function(data) {
      return $http.post('/login', data);
    },
     deleteUsers: function(data) {
      return $http.put('/deleteUsers',data);
    },
    FillDefaultDetailsSuperadminOrAdmin: function(data) {
      return $http.post('/SuperadminOrAdmin/FillDefaultDetailsSuperadminOrAdmin',data);
    },
    editUser: function(data) {
      return $http.post('/editUser',data);
    },

    // //ONLY SUPERADMIN
    // ListUsersSuperAdmin: function() {
    //   return $http.get('/Superadmin/ListUsersSuperadmin');
    // }, 
    //  AddAdminDetailsSuperAdmin: function(data) {
    //   return $http.post('/Superadmin/AddAdminDetailsSuperAdmin',data);
    // },

    // //ONLY ADMIN
     ListUsersAdmin: function() {

      return $http.post('/listUsers');
    },
     Signup: function(data) {
      return $http.post('/signup',data);
    }
	}


});