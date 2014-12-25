'use strict';

/**
 * @ngdoc service
 * @name clientApp.companies
 * @description
 * # companies
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('Companies', function ($q, $http, $timeout, Config, $rootScope) {

    // A private cache key.
    var cache = {};

    // Update event broadcast name.
    var broadcastUpdateEventName = 'SkeletonCompaniesChange';

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
    var getDataFromBackend = function() {
      var deferred = $q.defer();
      var url = Config.backend + '/api/companies';

      $http({
        method: 'GET',
        url: url
      }).success(function(response) {
        setCache(response.data);
        deferred.resolve(response.data);
      });

      return deferred.promise;
    };

    /**
     * Set the cache from the server.
     *
     * @param data
     *   The data to cache
     */
    var setCache = function(data) {
      // Cache data.
      cache = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        cache.data = undefined;
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast(broadcastUpdateEventName);
    };

    $rootScope.$on('clearCache', function() {
      cache = {};
    });

  });
