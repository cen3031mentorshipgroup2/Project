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

    Users.getMentees().then(function(response) {
      $scope.mentees = response.data;
      $scope.selectedmentee = $scope.mentees[0];
    }, function(error) {
      console.log('Unable to retrieve mentees:', error);
    });

    Users.getMentors().then(function(response) {
      $scope.mentors = response.data;
      $scope.selectedmentor = $scope.mentors[0];
    }, function(error) {
      console.log('Unable to retrieve mentees:', error);
    });

    $scope.getProfile = function(name) {
      return Users.getProfile(name);
    }

    $scope.rating = new Map();
    $scope.compatibility = new Map();

    $scope.getRating = function(name) {
      Users.getRating(name).then(function(response) {
        x = response.data.rating;
        $scope.rating.set(name,x);
      }, function(error) {
        console.log('Unable to retrieve rating:', error);
      });
    }

    $scope.getCompatibility = function(name) {
      Users.getCompatibility(name).then(function(response) {
        x = response.data.compatibility;
        $scope.compatibility.set(name,x);
      }, function(error) {
        console.log('Unable to retrieve compatibility:', error);
      });
    }

    $scope.showMentee = function(index) {
      $scope.selectedmentee = index;
    };

    $scope.showMentor = function(index) {
      $scope.selectedmentor = index;
      console.log($scope.selectedmentor);
    };
  }
]);
