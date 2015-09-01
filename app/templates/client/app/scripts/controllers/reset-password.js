'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ResetPasswordCtrl
 * @description
 * # ResetPasswordCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ResetPasswordCtrl', function ($scope, Auth, Account) {

    // Determine if password was reset successfully.
    $scope.passwordSaved = false;

    /**
     * Setting the access token in the localStorage so we can get the account
     * information and pull out the user ID from it to PATCH the user entity.
     *
     * @param password
     *  The new password.
     */
    $scope.saveNewPassword = function(password) {
      Account.get().then(function(user) {
        Auth.savePassword(user.id, password).then(function() {
          $scope.passwordSaved = true;
        });
      });
    };
  });
