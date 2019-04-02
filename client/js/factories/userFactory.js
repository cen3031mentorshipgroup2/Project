angular.module('users', []).factory('Users', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/users');
    },
    getCur: function () {
      return $http.get('/api/currentuser');
    },
    getProfile: function (name) {
      return $http.get('/api/profile?name=' + name);
    },
    getRating: function (name) {
      return $http.get('/api/rating?name=' + name);
    },
    getCompatibility: function (name) {
      return $http.get('/api/compatibility?name=' + name);
    },
    getMentees: function () {
      return $http.get('/api/mentees')
    },
    getMentors: function () {
      return $http.get('/api/mentors');
    },
    getMessages: function (name) {
      return $http.get('/api/messages?name=' + name);
    },
    getAllMessages: function () {
      return $http.get('/api/messages/all');
    },
    sendMessage: function (message,newUser,selectedmessages) {
      if (message) {
        if (newUser) {
          return $http.get('/api/send?name=' + newUser + "&message=" + message);
        }
        else {
          if (selectedmessages) {
            return $http.get('/api/send?name=' + selectedmessages + "&message=" + message);
          }
          else {
            return location.reload();
          }
        }
      }
      else {
        return location.reload();
      }
    }
  };

  return methods;
});
