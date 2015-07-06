'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DashboardCtrl', function ($scope, account, selectedCompany) {

    // Initialize values.
    $scope.companies = account.companies;
    $scope.selectedCompany = selectedCompany ? selectedCompany : parseInt(account.companies[0].id);
  });
