'use strict';

/**
 * @ngdoc service
 * @name clientApp.events
 * @description
 * # events
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('Events', function ($q, $http, $timeout, Config, Marker, $rootScope, $log) {

    // A private cache key.
    var cache = {};

    // Update event broadcast name.
    var broadcastUpdateEventName = 'SkeletonEventsChange';


    /**
     * Return the promise with the events list, from cache or the server.
     *
     * @param int companyId
     *   The company ID.
     *
     * @returns {*}
     */
    this.get = function(companyId, userId) {
      if (cache && cache[companyId]) {
        return $q.when(cache[companyId].data);
      }

      return getDataFromBackend(companyId, userId);
    };


    /**
     * Create a new item.
     *
     * @param data
     *   Object with data to be saved.
     */
    this.create= function(data) {
      var deferred = $q.defer();
      var url = Config.backend + '/api/events';
      var self = this;

      $http({
        method: 'POST',
        url: url,
        data: data
      }).success(function(response) {

        // Add the new item to the cache.
        var companyId = data.company;
        self.get(companyId).then(function(cachedData) {
          cachedData.unshift(response.data[0]);
          setCache(companyId, cachedData);
        });

        deferred.resolve(response.data[0]);
      });

      return deferred.promise;
    };

    /**
     * Return events array from the server.
     *
     * @param int companyId
     *   The company ID.
     *
     * @returns {$q.promise}
     */
    function getDataFromBackend(companyId, userId) {
      var deferred = $q.defer();
      var url = Config.backend + '/api/events';
      var params = {
        sort: '-updated',
        'filter[company]': companyId
      };

      if (userId) {
        params['filter[user]'] = userId;
      }

      $http({
        method: 'GET',
        url: url,
        params: params,
        transformResponse: prepareDataForLeafletMarkers
      }).success(function(response) {
        setCache(companyId, response);
        deferred.resolve(response);
      });

      return deferred.promise;
    };

    /**
     * Save cache, and broadcast en event to inform that the data changed.
     *
     * @param int companyId
     *   The company ID.
     * @param data
     *   Object with the data to cache.
     */
    var setCache = function(companyId, data) {
      // Cache data by company ID.
      cache[companyId] = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        if (cache.data && cache.data[companyId]) {
          delete(cache.data[companyId]);
        }
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast(broadcastUpdateEventName);
    }

    $rootScope.$on('clearCache', function() {
      cache = null;
    });

    /**
     * Convert the array of list of meters to and object of meters.
     *
     * Also prepare the lang and lat values so Leaflet can pick them up.
     *
     * @param list []
     *   List of meters in an array.
     *
     * @returns {*}
     *   List of events organized in an object, each meter it's a property keyed
     *   by the id.
     */
    function prepareDataForLeafletMarkers(list) {
      var events = {};

      // Convert response serialized to an object.
      list = angular.fromJson(list).data;

      angular.forEach(list, function(event) {
        events[event.id] = event;

        // Convert the geo location properties as expected by leaflet map.
        events[event.id].lat = parseFloat(event.location.lat);
        events[event.id].lng = parseFloat(event.location.lng);

        delete event.location;

        // Extend meter with marker properties and methods.
        angular.extend(events[event.id], Marker);
        // Define default icon properties and methods, in order, to be changed later.
        events[event.id].unselect();
      });

      return events;
    }

  });
