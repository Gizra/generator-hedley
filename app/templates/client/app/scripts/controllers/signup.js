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

    // Reset the flags.
    $scope.emailAvailable = true;
    $scope.usernameAvailable = true;

    /**
     * Send a password reset link.
     */
    $scope.signUp = function(user) {
      // Clear the error before each request.
      $scope.signupError = undefined;

      Auth.usersAvailability(user).then(function(response) {
        $scope.usernameAvailable = response.data.data.available.name;
        $scope.emailAvailable = response.data.data.available.mail;

        if ($scope.emailAvailable && $scope.usernameAvailable) {
          Auth.signUp(user).then(function() {
            // User registered successfully.
            $scope.signedUp = true;
          }, function (response) {
            // Error trying to register the user.
            $scope.signupError = response.data.detail;
          });
        }
      });
    };
  });
