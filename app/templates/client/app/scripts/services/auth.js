'use strict';

/**
 * @ngdoc service
 * @name clientApp.auth
 * @description
 * # auth
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('Auth', function ($injector, $rootScope, Utils, localStorageService, Config) {

    /**
     * Login by calling the Drupal REST server.
     *
     * @param user
     *   Object with the properties "username" and "password".
     *
     * @returns {*}
     */
    this.login = function(user) {
      // Service 'Auth' can't depend on '$http', hence injecting it manually
      return $injector.get('$http')({
        method: 'GET',
        url: Config.backend + '/api/login-token',
        headers: {
          'Authorization': 'Basic ' + Utils.Base64.encode(user.username + ':' + user.password)
        }
      });
    };

    /**
     * Logout current user.
     *
     * Do whatever cleaning up is required.
     */
    this.logout = function() {
      localStorageService.remove('access_token');

      $rootScope.$broadcast('clearCache');
      // Something went wrong, change state back to login
      // Service 'Auth' can't depend on '$state', hence injecting it manually
      $injector.get('$state').go('login');

    };

    /**
     * A user is logged in.
     */
    this.isAuthenticated = function() {
      return !!localStorageService.get('access_token');
    };

    /**
     * Authentication failed, set state to login.
     */
    this.authFailed = function() {
      this.logout();
    };
  });
