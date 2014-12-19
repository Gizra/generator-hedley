'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ItemsAddCtrl
 * @description
 * # ItemsAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ItemsAddCtrl', function ($scope, $stateParams, Items) {

    $scope.data = {};

    /**
     * Create a new item.
     *
     * @param data
     *   Object with data to be saved.
     */
    $scope.create = function(data) {
      // Indicate we are in the middle of creation.
      $scope.creating = true;
      // Set the company by the active one.
      data.company = $stateParams.companyId;
      Items.create(data).then(function() {
        $scope.creating = false;
        $scope.data = {};
      });
    }
  });
