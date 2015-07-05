'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SignUpCtrl', function ($scope, Auth) {

    /**
     * Send a password reset link.
     */
    $scope.signUp = function(user) {

      // Reset the flags before each request.
      $scope.emailNotAvailable = false;
      $scope.usernameNotAvailable = false;

      Auth.usernameAvailable(user.username).then(function(response) {
        if (response.data.data.available) {
          Auth.emailAvailable(user.email).then(function(response) {
            if (response.data.data.available) {
              // Email is available.
              Auth.signUp(user).then(function() {
                // User registered successfully.
                $scope.signedUp = true;
              });
            }
            else {
              // Email is not available.
              $scope.emailNotAvailable = true;
            }
          });
        }
        else {
          // Username is not available.
          $scope.usernameNotAvailable = true;
        }
      });
    };
  });
