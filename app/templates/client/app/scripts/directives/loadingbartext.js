'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:loadingBarText
 * @description
 * # loadingBarText
 */
angular.module('clientApp')
  .directive('loadingBarText', function () {
    return {
      retrict: 'EA',
      template: '<div class=\"splash-screen\" ng-show="isLoading">{{text}}</div>',
      controller: function($scope) {
        $scope.text = 'loading...';
        $scope.isLoading = false;

        /**
         * Determine if the text is showing.
         *
         * @param isLoading - Boolean
         *  True show the text, false hide it.
         */
        function setLoading(isLoading) {
          $scope.isLoading = isLoading;
        }

        // Events to set the message when start the XHR request until is completed.
        $scope.$on('cfpLoadingBar:started', function() {
          setLoading(true);
        });

        $scope.$on('cfpLoadingBar:completed', function() {
          setLoading(false);
        });
      },
      // Isolate scope.
      scope: {}
    };
  });
