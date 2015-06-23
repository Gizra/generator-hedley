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
     * If email is available then send to it an email with instructions.
     *
     * @param email
     *  The email of the user.
     *
     * @returns {*}
     */
    this.resetPassword = function(email) {
      return $injector.get('$http')({
        method: 'POST',
        url: Config.backend + '/api/reset-password',
        data: {email: email}
      });
    };

    /**
     * Save new password for a user.
     *
     * @param uid
     *  User id.
     * @param password
     *  A new password to set.
     *
     * @returns {*}
     */
    this.savePassword = function(uid, password) {
      return $injector.get('$http')({
        method: 'PATCH',
        url: Config.backend + '/api/users-update/' + uid,
        data: {password: password}
      });
    };

    /**
     * Checks if email is available.
     *
     * @param email
     * @returns {*}
     */
    this.emailAvailable = function(email) {
      return $injector.get('$http')({
        method: 'POST',
        url: Config.backend + '/api/email-available',
        data: {email: email}
      });
    };

    /**
     * Checks if username is available.
     *
     * @param username
     * @returns {*}
     */
    this.usernameAvailable = function(username) {
      return $injector.get('$http')({
        method: 'POST',
        url: Config.backend + '/api/username-available',
        data: {username: username}
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
