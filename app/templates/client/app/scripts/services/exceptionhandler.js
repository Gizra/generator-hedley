'use strict';

/**
 * @ngdoc service
 * @name clientApp.exceptionHandler
 * @description
 * # exceptionHandler
 * Provider in the clientApp.
 */
angular.module('clientApp')
  .provider('$exceptionHandler', function () {

    this.$get = function (ErrorLog) {
      return ErrorLog;
    };
  });
