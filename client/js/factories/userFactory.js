angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/users');
    },
    getCur: function() {
      return $http.get('/api/currentuser');
    },
    getProfile: function(name) {
      return $http.get('/api/profile?name=' + name);
    }
  };

  return methods;
});
