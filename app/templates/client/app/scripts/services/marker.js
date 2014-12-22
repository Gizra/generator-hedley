'use strict';

angular.module('clientApp')
  .factory('Marker', function ($state, Map) {
    // Save last marker selected.
    var selected;
    // Definitions of the map icons.
    var icons = {
      default: {
        iconUrl: '/images/marker-blue.png',
        shadowUrl: '/images/shadow.png',
        iconSize:     [40, 40], // size of the icon
        shadowSize: [26, 26],
        iconAnchor:   [32, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [25, 7]  // the same for the shadow
      },
      selected: {
        iconUrl: '/images/marker-red.png',
        shadowUrl: '/images/shadow.png',
        iconSize:     [40, 40], // size of the icon
        shadowSize: [26, 26],
        iconAnchor:   [32, 30], // point of the icon which will correspond to marker's location
        shadowAnchor: [25, 7]  // the same for the shadow
      }
    };

    /**
     * Get the icon properties of a marker.
     *
     * @param type
     *    Name of the existing icons.
     *
     * @returns {*}
     *    Properties of the icon.
     */
    function getIcon(type) {
      return icons[type];
    }

    return {
      /**
       * Return "default" icon to set icon marker is unselected.
       */
      unselect: function() {
        this.icon = getIcon('default');
      },
      /**
       * Select a new marker.
       *
       * Unselect previous marker, and return the "selected" icon.
       */
      select: function() {
        if (angular.isDefined(selected)) {
          selected.unselect();
        }
        selected = this;
        this.icon = getIcon('selected');

        Map.centerMapByMarker(this);
      },
      /**
       * Return geoposition object {lag: 35.00, lng: 56.56}. Generally used to center the map by the marker.
       */
      getPosition: function() {
        return {
          lat: this.lat,
          lng: this.lng
        };
      }
    };
  });
