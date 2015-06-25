'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, Auth, $state, Account, accessToken) {

    // Try to verify the email when access token is being passed.
    if (accessToken) {
      Account.verifyEmail(accessToken).then(function () {
        $scope.emailVerified = true;
      });
    }

    // Will be FALSE during login GET period - will cause the login button to be
    // disabled.
    $scope.loginButtonEnabled = true;

    // Will be TRUE after failed login attempt.
    $scope.loginFailed = false;

    /**
     * Login a given user.
     *
     * If everything goes well, change state to 'main'.
     *
     * @param user
     *   Object with the properties "username" and "password".
     */
    $scope.login = function(user) {
      $scope.loginButtonEnabled = false;
      Auth.login(user).then(function() {
        $state.go('homepage');
      }, function() {
        $scope.loginButtonEnabled = true;
        $scope.loginFailed = true;
      });
    };
  });
