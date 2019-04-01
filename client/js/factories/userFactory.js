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
    },
    getRating: function(name) {
      return $http.get('/api/rating?name=' + name);
    },
    getCompatibility: function(name) {
      return $http.get('/api/compatibility?name=' + name);
    },
    getMentees: function() {
      return $http.get('/api/mentees')
    },
    getMentors: function() {
      return $http.get('/api/mentors');
    }
  };

  return methods;
});
