'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EventsCtrl', function ($scope, events, mapConfig, $state, $stateParams, $log) {

    // Initialize values.
    $scope.events = events;
    $scope.mapConfig = mapConfig;
    $scope.authors = {};

    angular.forEach(events, function(event) {
      $scope.authors[event.user.id] = {
        id: event.user.id,
        name: event.user.label,
        count: $scope.authors[event.user.id] ? ++$scope.authors[event.user.id].count : 1
      };
    });

    /**
     * Set the selected item.
     *
     * @param int id
     *   The event ID.
     */
    var setSelectedEvent = function(id) {
      $scope.events[id].select();
    };

    if ($stateParams.eventId) {
      setSelectedEvent($stateParams.eventId);
    }

    // Select marker in the Map.
    $scope.$on('leafletDirectiveMarker.click', function(event, args) {
      $state.go('dashboard.byCompany.events.event', {eventId: parseInt(args.markerName)});
    });
  });
