'use strict';

/**
 * @ngdoc service
 * @name clientApp.stackTrace
 * @description
 * # stackTrace
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StackTrace', function () {

    // Public API here
    return {
      // "printStackTrace" is a global object.
      print: printStackTrace
    };
  });
