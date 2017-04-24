// app.service('myService',function(){
// 	this.arr={};
// })

app.service('myService',function($q,$http){
	self = this;
	this.arr={};
    this.abc={};
    self.pqr = {}
	// this.def=function(name){
	// 	console.log("Hi"+name);
	// }
// 	self.postMethod = function(data,AddedUrl){
//     var deff=$q.defer();
//     var req = {
//         method: 'POST',
//         url: 'http://localhost:8090/api/'+AddedUrl,
//         "Content-Type": "application/json",
//         data:JSON.stringify(data)
//      };
//      $http(req).success(function(objS){
//         deff.resolve(objS);
//      }).error(function(objE){
//         deff.reject(objE);
//      });
//      return deff.promise;
//      }

//      self.postLoginMethod = function(data,AddedUrl){
//     var deff=$q.defer();
//     var req = {
//         method: 'POST',
//         url: 'http://localhost:8090/api/'+AddedUrl,
//         "Content-Type": "application/json",
//         data:JSON.stringify(data)
//      };
//      $http(req).success(function(objS){
//         deff.resolve(objS);
//      }).error(function(objE){
//         deff.reject(objE);
//      });
//      return deff.promise;
//      }

//      self.postSuccessLoginMethod = function(data,AddedUrl){
//     var deff=$q.defer();
//     var req = {
//         method: 'POST',
//         url: 'http://localhost:8090/api/'+AddedUrl,
//         "Content-Type": "application/json",
//         data:JSON.stringify(data)
//      };
//      $http(req).success(function(objS){
//         deff.resolve(objS);
//      }).error(function(objE){
//         deff.reject(objE);
//      });
//      return deff.promise;
//      }
                 
//      self.getMethod = function(AddedUrl){
//         var baseURL='';

//         if(AddedUrl=='getUserList')
//         {baseURL='http://localhost:8090/'}
//     else
//     {baseURL='http://localhost:8090/api/'}

//         var deff=$q.defer();
//         var req = {
//             method: 'GET',
//             //modified------------added /api/ 
//             url: baseURL+AddedUrl,
//             "Content-Type": "application/json"
//         };
//         $http(req).success(function(objS){
//             deff.resolve(objS);
//         }).error(function(objE){
//             deff.reject({msg:objE});
//         });
//         return deff.promise;
//      }


// self.deleteUser=function(user_name) {
//       return $http.delete('/api/user/'+user_name+'/deleteUser');
//     }
   

})





