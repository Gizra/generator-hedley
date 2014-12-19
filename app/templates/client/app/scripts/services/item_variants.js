'use strict';

/**
 * @ngdoc service
 * @name clientApp.itemVariants
 * @description
 * # itemVariants
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('ItemVariants', function ($q, $http, $timeout, Config, $rootScope, $log) {

    // A private cache key.
    var cache = {};

    // Update event broadcast name.
    var broadcastUpdateEventName = 'gbItemVariantssChanged';

    /**
     * Return the promise with the items list, from cache or the server.
     *
     * @param int itemId
     *   The item ID.
     *
     * @returns {*}
     */
    this.get = function(itemId) {
      if (cache[itemId]) {
        return $q.when(cache[itemId].data);
      }

      return getDataFromBackend(itemId);
    };

    /**
     * Return items array from the server.
     *
     * @param int itemId
     *   The item ID.
     *
     * @returns {$q.promise}
     */
    var getDataFromBackend = function(itemId) {
      var deferred = $q.defer();
      var url = Config.backend + '/api/item_variants';
      var params = {};

      if (itemId) {
        params = {
          'filter[item]': itemId
        }
      }

      $http({
        method: 'GET',
        url: url,
        params: params
      }).success(function(response) {
        setCache(itemId, response.data);
        deferred.resolve(response.data);
      });

      return deferred.promise;
    }

    /**
     * Save data in cache, and broadcast en event to inform that the meters data changed.
     *
     * @param int itemId
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
      $rootScope.$broadcast(broadcastUpdateEventName);
    }

    $rootScope.$on('clearCache', function() {
      cache = null;
    });

  });
