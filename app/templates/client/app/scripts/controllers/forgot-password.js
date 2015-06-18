'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ForgotPasswordCtrl', function ($scope, Auth) {

    /**
     * Send a password reset link.
     */
    $scope.forgotPassword = function() {
      Auth.resetPassword($scope.email).then(function () {
          $scope.passwordResetSent = true;
        },
        function(response) {
          // Too many requests.
          if (response.status == 429) {
            $scope.ErrorMsg = true;
          }
        });
    };
  });
