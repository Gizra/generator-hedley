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
      // Reset the error message for each request.
      $scope.ErrorMsg = false;

      Auth.resetPassword($scope.email).then(function () {
          $scope.passwordResetSent = true;
        },
        function(response) {
          $scope.ErrorMsg = response.data.title;

          // Too many requests.
          if (response.status == 429) {
            $scope.ErrorMsg = response.statusText;
            $scope.TooManyRequests = true;
          }
        });
    };
  });
