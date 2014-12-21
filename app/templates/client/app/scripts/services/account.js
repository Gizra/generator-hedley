'use strict';

/**
 * @ngdoc service
 * @name clientApp.account
 * @description
 * # account
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('Account', function ($q, $http, $timeout, Config, $rootScope, $log) {

    // A private cache key.
    var cache = {};

    /**
     * Return the promise with the events list, from cache or the server.
     *
     * @returns {*}
     */
    this.get = function(id) {
      return $q.when(cache.data || getDataFromBackend(id));
    };

    /**
     * Return events array from the server.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend(id) {
      var deferred = $q.defer();
      var url = Config.backend + '/api/me/';

      $http({
        method: 'GET',
        url: url
      }).success(function(response) {
        $log.log(response);
        setCache(id, response.data[0]);
        deferred.resolve(response.data[0]);
      });

      return deferred.promise;
    }

    /**
     * Save meters in cache, and broadcast en event to inform that the meters data changed.
     *
     * @param itemId
     *   The item ID.
     * @param data
     *   The data to cache.
     */
    var setCache = function(itemId, data) {
      // Cache data.
      cache[itemId] = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        delete(cache[itemId]);
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast('gb.account.changed');
    }

    $rootScope.$on('clearCache', function() {
      cache = null;
    });

  });
