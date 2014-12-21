'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EventsCtrl', function ($scope, events, mapConfig, $stateParams, $log) {

    // Initialize values.
    $scope.events = events;
    $scope.selectedEvent = null;

    $scope.mapConfig = mapConfig;
    $scope.markers = {};

    // Add markers.
    angular.forEach(events, function(event) {
      $scope.markers[event.id] = {
        lat: parseFloat(event.location.lat),
        lng: parseFloat(event.location.lng)
      };
    });

    /**
     * Set the selected item.
     *
     * @param int id
     *   The event ID.
     */
    var setSelectedEvent = function(id) {
      $scope.selectedEvent = null;

      angular.forEach($scope.events, function(value) {
        if (value.id == id) {
          $scope.selectedEvent = value;
        }
      });
    };

    if ($stateParams.eventId) {
      setSelectedEvent($stateParams.eventId);
    }
  });
