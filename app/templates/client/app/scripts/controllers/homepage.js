'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HomepageCtrl', function ($scope, $state, companies, Auth) {
    if (Auth.isAuthenticated()) {
      var defaultCompanyId = companies[0].id;
      $state.go('dashboard.byCompany.events', {companyId: defaultCompanyId});
    }
    else {
      // Redirect to login.
      $state.go('login');
    }
  });
