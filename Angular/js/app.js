'use strict';
var app = angular.module('MyApp', ['ui.router'])


app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.interceptors.push('httpModifier');
    $stateProvider

  .state('Login', {
        url: '/Login',
        controller: 'LoginCtrl',
        templateUrl: 'templates/Login.html'
    })
   .state('signup', {
        url: '/Signup',
        controller: 'SignupCtrl',
        templateUrl: 'templates/Signup.html'
    })
    .state('ListUsersSuperAdmin', {
        url: '/ListUsers/SuperAdmin',
        controller: 'ListUsersSuperAdminCtrl',
        templateUrl: 'templates/ListUsers.html'
    })
      .state('ListUsersAdmin', {
        url: '/ListUsers/Admin',
        controller: 'ListUsersAdminCtrl',
        templateUrl: 'templates/ListUsers.html'
    })

    .state('editUsers', {
        url: '/EditUsers/:id',
        controller: 'EditUsersCtrl',
        templateUrl: 'templates/EditUsers.html'
    })

     .state('AddAdmin', {
        url: '/AddAdmin',
        controller: 'AddAdminCtrl',
        templateUrl: 'templates/AddAdmin.html'
    })
     .state('forgetpassword', {
        url: '/forgetpassword',
        controller: 'forgetpasswordCtrl',
        templateUrl: 'templates/forgetpassword.html'
    })

     .state('updatePwd', {
        url: '/getUserList',
        controller: 'updatePwdCtrl',
        templateUrl: 'templates/updatePwd.html'
    }) 
    
 

    $urlRouterProvider.otherwise('/Login');




// app.run(function($rootScope,$location,$window,$state) {
//   $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
//     if(localStorage.isLogged == 'false' || localStorage.isLogged == null || localStorage.isLogged == undefined){      
//         $state.go('Login', {}, {notify:false});
//          //event.preventDefault();
     
//     }

//   });
// });


})
