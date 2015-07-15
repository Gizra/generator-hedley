'use strict';

/**
 * @ngdoc service
 * @name clientApp.account
 * @description
 * # account
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('Account', function ($q, $http, $timeout, Config, $rootScope, Auth) {

    // A private cache key.
    var cache = {};

    /**
     * Return the promise with the events list, from cache or the server.
     *
     * @returns {*}
     */
    this.get = function() {
      return $q.when(cache.data || getDataFromBackend());
    };

    /**
     * Return events array from the server.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend() {
      var deferred = $q.defer();
      var url = Config.backend + '/api/me/';

      $http({
        method: 'GET',
        url: url,
        transformResponse: prepareResponse
      }).success(function(response) {
        setCache(response[0]);
        deferred.resolve(response[0]);
      });

      return deferred.promise;
    }

    /**
     * Verify a user.
     *
     * @param accessToken
     * @returns {*}
     */
    this.verifyEmail = function(accessToken) {
      Auth.setAccessToken(accessToken);

      // After setting the access token in the local storage, try to get the
      // user account from the data, if succeed then change its status.
      return getDataFromBackend().then(function(user) {
        return $http({
          method: 'PATCH',
          url: Config.backend + '/api/v1.1/users/' + user.id,
          data: {status: 1}
        });
      });
    };

    /**
     * Save meters in cache, and broadcast en event to inform that the meters data changed.
     *
     * @param itemId
     *   The item ID.
     * @param data
     *   The data to cache.
     */
    var setCache = function(data) {
      // Cache data.
      cache = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        cache = {};
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast('gb.account.changed');
    };

    /**
     * Prepare response; Convert ID to int.
     *
     * As we explicetly require ui-router to match an int, we must case the
     * entity ID to integer.
     *
     * @param list
     *
     * @returns {*}
     */
    function prepareResponse(data) {
      // Convert response serialized to an object.
      data = angular.fromJson(data).data;

      if (!data) {
        // A 401 response was sent.
        return;
      }

      angular.forEach(data[0].companies, function(value, key) {
        data[0].companies[key].id = parseInt(value.id);
      });

      return data;
    };

    $rootScope.$on('clearCache', function() {
      cache = {};
    });

  });
