'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ItemsCtrl', function ($scope, items, itemVariants, $stateParams, $log) {

    // Initialize values.
    $scope.items = items;
    $scope.selectedItem = null;

    $scope.itemVariants = itemVariants;
    $scope.selectedItemVariants = null;

    /**
     * Set the selected item.
     *
     * @param int id
     *   The item ID.
     */
    var setSelectedItem = function(id) {
      $scope.selectedItem = null;

      angular.forEach($scope.items, function(value) {
        if (value.id == id) {
          $scope.selectedItem = value;
        }
      });
    };

    /**
     * Set the selected item variant.
     *
     * @param int id
     *   The item variant ID.
     */
    var setSelectedItemVariant = function(id) {
      $scope.selectedItemVariant = null;

      angular.forEach($scope.itemVariants, function(value) {
        if (value.id == id) {
          $scope.selectedItemVariant = value;
        }
      });
    };

    if ($stateParams.itemId) {
      setSelectedItem($stateParams.itemId);
    }

    if ($stateParams.itemVariantId) {
      setSelectedItemVariant($stateParams.itemVariantId);
    }
  });
