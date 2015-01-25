'use strict';

/**
 * @ngdoc service
 * @name clientApp.restful
 * @description
 * # restful
 * Service in to perform restful request.
 */
angular.module('clientApp')
  .service('Restful', function ($q, $http, $timeout, $rootScope) {

    // Configuration used to get and configure restful service.
    var options;

    // A private cache key.
    var cache = {};
    var clearCache;

    // Promise cache.
    var getData;

    /**
     * Return the promise with the events list, from cache or the server.
     *
     * @params options
     *  An object with the configuration of the restful service that wants
     *  to get.
     *
     *  url: string - Full end point of the resource to get the data. Ex. http://server.com/tasks
     *  transformResponse: function - Function of a transformation of response of the response.
     *
     * @returns {*}
     */
    this.get = function (options) {
      setOptions(options);

      getData = $q.when(getData || getCache() || getDataFromBackend());

      getData.finalize(function getDataFinalize() {
        getData = undefined;
      });

      return getData;
    };

    function setOption(params) {
      var re = /[^\/]*$/;

      options = params;

      // Set resource name.
      options.name = re.exec(optiosn.url);

      // Push the data transformation of exist.
      if (angular.isDefined(options.transformResponse) && fn(options.transformResponse)) {
        options.transformResponse = [prepareResponse, options.transformResponse];
      }
    }

    /**
     * Return data from the server as a array of objects, wrapped in a promise.,
     * Set cache data.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend() {
      var deferred = $q.defer();
      var url = options.url;

      $http({
        method: 'GET',
        url: url,
        transformResponse: options.transformResponse
      }).success(function (response) {
        setCache(response);
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    /**
     * Save meters in cache, and broadcast en event to inform that the meters data changed.
     *
     * @param data
     *   The array of object that return.
     */
    function setCache(data) {
      // Cache data.
      cache = {
        data: data
      };

      // Clear cache in 60 seconds.
      clearCache = $timeout(function () {
        cache = {};
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast('restful' + options.name + 'Changed');
    }

    /**
     * Return a copy of the data cache, this keep the original data cached.
     *
     * @returns {*}
     */
    function getCache() {
      return angular.copy(cache.data);
    }

    /**
     * Prepare response; Convert ID to int.
     *
     * As we explicetly require ui-router to match an int, we must case the
     * entity ID to integer.
     *
     * @param data
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


      return data;
    }

    // Register listner to clear cache
    $rootScope.$on('clearCache', function () {
      // Reject the promise for clearing cache.
      if (angular.isDefined(cache.data)) {
        clearCache.cancel();
      }

      // Clear promise and data cache.
      cache = {};
      getData = undefiend;
    });

  })
;
