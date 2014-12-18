'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CompaniesCtrl', function ($scope, companies, $stateParams, $log) {

    // Initialize values.
    $scope.companies = companies;
    $scope.selectedCompany = null;

    /**
     * Set the selected Company.
     *
     * @param int id
     *   The company ID.
     */
    var setSelectedCompany = function(id) {
      $scope.selectedCompany = null;

      angular.forEach($scope.companies, function(value) {
        if (value.id == id) {
          $scope.selectedCompany = value;
        }
      });
    };

    if ($stateParams.id) {
      setSelectedCompany($stateParams.id);
    }
  });
