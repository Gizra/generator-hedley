'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ResetPasswordCtrl', function ($scope, Auth, $state, $location, Account, accessToken) {

    // If 'access-token' is not provided redirect to login.
    if (!accessToken) {
      $state.go('login');
    }

    $scope.passwordSaved = false;

    /**
     * Setting the access token in the localStorage so we can get the account
     * information and pull out the user ID from it to PATCH the user entity.
     *
     * @param password
     *  The new password.
     */
    $scope.saveNewPassword = function(password) {
      Auth.setAccessToken(accessToken);

      Account.get().then(function(user) {
        Auth.savePassword(user.id, password).then(function() {
          $scope.passwordSaved = true;
        });
      });
    };
  });
