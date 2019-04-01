angular.module('users').controller('userController', ['$scope', 'Users',
  function($scope, Users) {

    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    Users.getCur().then(function(response) {
      $scope.currentUser = response.data;
    }, function(error) {
      console.log('Unable to retrieve current user:', error);
    });

    var arr = window.location.pathname.split('/');
    var name = arr[arr.length-1] || arr[arr.length-2];
    Users.getProfile(name).then(function(response) {
      $scope.currentProfile = response.data;
    }, function(error) {
      console.log('Unable to retrieve current profile:', error);
    });

  }
]);
