'use strict';

angular.module('negawattClientApp')
  .service('Map', function (leafletData) {

    // Initial center point.
    var cache = {};

    /**
     * Return extra configuration for the maps.
     *
     * @returns {*}
     *  Maps Default configuration object.
     */
    this.getConfig = function() {
      return {
        zoomControlPosition: 'bottomleft'
      };
    };

    /**
     * Set geolocation values of the center of the map.
     *
     * @param center
     *   Center object format for leaftlet map.
     */
    this.setCenter = function(center) {
      cache.center = center;
    };

    /**
     * Return of the geolocation values of the center of the map.
     *
     * @return center
     *   Center object.
     */
    this.getCenter = function() {
      return cache.center;
    };

    /**
     * Center the map by the marker.
     *
     * @param marker
     *   Marker object.
     */
    this.centerMapByMarker = function(marker) {
      leafletData.getMap().then(function(map){
        map.setView(marker.getPosition());
      });
    };

  });
