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
      link: function postLink(scope, element) {
        var text = 'loading...';
        element.prepend('<div class=\"splash-screen\">'  + text +  '</div>');
      }
    };
  });
