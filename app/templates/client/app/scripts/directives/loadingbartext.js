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
      restrict: 'EA',
      template: '<div class="splash-screen" ng-show="isLoading">{{text}}</div>',
      controller: function($scope) {
        $scope.text = 'loading...';
        $scope.isLoading = false;

        /**
         * Indicate a loading is in process.
         *
         * @param isLoading bool
         *  True to show the loader.
         */
        function setLoading(isLoading) {
          $scope.isLoading = isLoading;
        }

        // Events to set the message when start the XHR request until is completed.
        $scope.$on('cfpLoadingBar:started', function() {
          // Set loading progress bar upon HTTP request.
          setLoading(true);
        });

        $scope.$on('cfpLoadingBar:completed', function() {
          setLoading(false);
        });

      },
      // Isolate scope the directive, and avoid read or modify data from the parent scope.
      scope: {}
    };
  });
