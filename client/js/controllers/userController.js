angular.module('users').controller('userController', ['$scope', 'Users',
  function ($scope, Users) {

    Users.getAll().then(function (response) {
      $scope.users = response.data;
    }, function (error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.ratingoption = 1;

    Users.getCur().then(function (response) {
      $scope.currentUser = response.data;
      Users.getAllMessages().then(function (response) {
        $scope.allmessages = response.data;
        var s = new Set();
        for (let message of $scope.allmessages) {
          if (message.from != $scope.currentUser.username) {
            s.add(message.from);
          }
          else if (message.to != $scope.currentUser.username) {
            s.add(message.to);
          }
        }
        $scope.accounts = Array.from(s);
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('name');
        if (s.has(myParam)) {
          $scope.selectedmessages = myParam;
          $scope.getMessages($scope.selectedmessages);
        }
        else {
          $scope.newUser = myParam;
        }
      }, function (error) {
        console.log('Unable to retrieve current messages:', error);
      });
    }, function (error) {
      console.log('Unable to retrieve current user:', error);
    });

    var arr = window.location.pathname.split('/');
    var name = arr[arr.length - 1] || arr[arr.length - 2];
    Users.getProfile(name).then(function (response) {
      $scope.currentProfile = response.data;
    }, function (error) {
      console.log('Unable to retrieve current profile:', error);
    });

    Users.getMentees().then(function (response) {
      $scope.mentees = response.data;
      $scope.selectedmentee = $scope.mentees[0];
    }, function (error) {
      console.log('Unable to retrieve mentees:', error);
    });

    Users.getMentors().then(function (response) {
      $scope.mentors = response.data;
      $scope.selectedmentor = $scope.mentors[0];
    }, function (error) {
      console.log('Unable to retrieve mentees:', error);
    });


    $scope.getProfile = function (name) {
      return Users.getProfile(name);
    }

    $scope.rating = new Map();
    $scope.compatibility = new Map();

    $scope.sendRating = function (name) {
      Users.sendRating(name, $scope.ratingoption).then(function (response) {
        location.reload();
      }, function (error) {
        console.log('Unable to send rating:', error);
      });
    }

    $scope.getRating = function (name) {
      Users.getRating(name).then(function (response) {
        x = response.data.rating;
        x = x.toFixed(2);
        $scope.rating.set(name, x);
      }, function (error) {
        console.log('Unable to retrieve rating:', error);
      });
    }

    $scope.getCompatibility = function (name) {
      Users.getCompatibility(name).then(function (response) {
        x = response.data.compatibility;
        x = x.toFixed(2);
        $scope.compatibility.set(name, x);
      }, function (error) {
        console.log('Unable to retrieve compatibility:', error);
      });
    }

    $scope.getCompatibility2 = function (name) {
      Users.getCompatibility2(name).then(function (response) {
        x = response.data.compatibility;
        x = x.toFixed(2);
        $scope.compatibility.set(name, x);
      }, function (error) {
        console.log('Unable to retrieve compatibility:', error);
      });
    }

    $scope.getMessages = function (name) {
      Users.getMessages(name).then(function (response) {
        $scope.selectedmessages = name;
        $scope.messages = response.data;
        delete $scope.newUser;
      }, function (error) {
        console.log('Unable to retrieve rating:', error);
      });
    }

    $scope.showMentee = function (index) {
      $scope.selectedmentee = index;
    };

    $scope.showMentor = function (index) {
      $scope.selectedmentor = index;
    };

    $scope.compatibilityOrder = function (user) {
      return $scope.compatibility.get(user.username);
    }

    $scope.newMessage = function () {
      console.log('test');
      delete $scope.selectedmessages;
      delete $scope.messages;
    }

    $scope.sendMessage = function () {
      var a = $scope.message;
      var b = $scope.newUser;
      var c = $scope.selectedmessages;
      console.log(a);
      console.log(b);
      console.log(c);
      Users.sendMessage(a, b, c).then(function (response) {
        if (c) {
          location.href = location.origin + location.pathname + '?name=' + c;
        }
        else {
          location.href = location.origin + location.pathname + '?name=' + b;
        }
      }, function (error) {
        console.log('Unable to send message:', error);
      });
    }
  }
]);
