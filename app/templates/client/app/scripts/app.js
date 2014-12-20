'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',

    'config',
    'leaflet-directive',
    'LocalStorageModule',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    /**
     * Redirect a user to a 403 error page.
     *
     * @param $state
     *   The ui-router state.
     * @param Auth
     *   The Auth service.
     * @param $timeout
     *   The timeout service.
     */
    var page403 = function($state, Auth,$timeout) {
      if (!Auth.isAuthenticated()) {
        // We need to use $timeout to make sure $state is ready to
        // transition.
        $timeout(function() {
          $state.go('403');
        });
      }
    };

    // Now set up the states.
    $stateProvider
      .state('homepage', {
        url: '/',
        controller: 'HomepageCtrl',
        resolve: {
          companies: function(Companies) {
            return Companies.get();
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '',
        templateUrl: 'views/dashboard/main.html',
        controller: 'DashboardCtrl',
        onEnter: page403
      })
      .state('dashboard.byCompany', {
        url: '/dashboard/{companyId:int}',
        abstract: true,
        // Since the state is abstract, we inline the <ui-view> tag.
        template: '<ui-view/>',
        views: {
          map: {
            templateUrl: 'views/dashboard/main.map.html',
            resolve: {
              mapConfig: function(Map) {
                return Map.getConfig();
              }
            }
          },
          details: {
            templateUrl: 'views/dashboard/main.details.html'
          }
        }
      })
      .state('dashboard.byCompany.events', {
        url: '/events',
        templateUrl: 'views/dashboard/events/events.html',
        controller: 'EventsCtrl',
        onEnter: page403,
        resolve: {
          events: function($stateParams, Events) {
            return Events.get($stateParams.companyId);
          }
        }
      })
      .state('dashboard.companies', {
        url: '/companies',
        templateUrl: 'views/dashboard/companies/companies.html',
        controller: 'CompaniesCtrl',
        onEnter: page403,
        resolve: {
          companies: function(Companies) {
            return Companies.get();
          }
        }
      })
      .state('dashboard.companies.company', {
        url: '/{id:int}',
        templateUrl: 'views/dashboard/companies/companies.company.html',
        controller: 'CompaniesCtrl',
        onEnter: page403
      })
      .state('dashboard.account', {
        url: '/my-account',
        templateUrl: 'views/dashboard/account/account.html',
        controller: 'AccountCtrl',
        onEnter: page403,
        resolve: {
          account: function(Account) {
            return Account.get();
          }
        }
      })
      .state('403', {
        url: '/403',
        templateUrl: 'views/403.html'
      });

    // For any unmatched url, redirect to '/'.
    $urlRouterProvider.otherwise('/');

    // Define interceptors.
    $httpProvider.interceptors.push(function ($q, Auth, localStorageService) {
      return {
        'request': function (config) {
          if (!config.url.match(/login-token/)) {
            config.headers = {
              'access_token': localStorageService.get('access_token')
            };
          }
          return config;
        },

        'response': function(result) {
          if (result.data.access_token) {
            localStorageService.set('access_token', result.data.access_token);
          }
          return result;
        },

        'responseError': function (response) {
          if (response.status === 401) {
            Auth.authFailed();
          }

          return $q.reject(response);
        }
      };
    });
  })
  .run(function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });
