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
      var cacheId = companyId + ':' + userId;
      if (cache && cache[cacheId]) {
        return $q.when(cache[cacheId].data);
      }

      return getDataFromBackend(companyId, userId);
    };

    /**
     * Return a promise authors list.
     *
     * @param int companyId
     *   The company ID.
     *
     * @returns {*}
     */
    this.getAuthors = function(companyId) {
      var deferred = $q.defer();
      var authors = {};
      this.get(companyId).then(function(events) {
        angular.forEach(events, function(event) {
          authors[event.user.id] = {
            id: parseInt(event.user.id),
            name: event.user.label,
            count: authors[event.user.id] ? ++authors[event.user.id].count : 1
          };
        });
        deferred.resolve(authors);
      });
      return deferred.promise;
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
      var cacheId = companyId + ':' + userId;
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
        setCache(cacheId, response);
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
    var setCache = function(cacheId, data) {
      // Cache data by company ID.
      cache[cacheId] = {
        data: data,
        timestamp: new Date()
      };

      // Clear cache in 60 seconds.
      $timeout(function() {
        if (cache.data && cache.data[cacheId]) {
          cache.data[cacheId] = null;
        }
      }, 60000);

      // Broadcast a change event.
      $rootScope.$broadcast(broadcastUpdateEventName);
    };

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
    };

    $rootScope.$on('clearCache', function() {
      cache = {};
    });

  });
