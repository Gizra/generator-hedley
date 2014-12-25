'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HomepageCtrl', function ($scope, $state, account, $log) {
    if (account) {
      // @todo: Remove parseInt()?
      var defaultCompanyId = parseInt(account.companies[0].id);
      $state.go('dashboard.byCompany.events', {companyId: defaultCompanyId});
    }
    else {
      // Redirect to login.
      $state.go('login');
    }
  });
