'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EventsCtrl', function ($scope, events, authors, mapConfig, $state, $stateParams, channelManager, $log) {

    // Initialize values.
    $scope.events = events;
    $scope.mapConfig = mapConfig;
    $scope.authors = authors;
    $scope.selectedAuthorId = null;

    /**
     * Set the selected item.
     *
     * @param int id
     *   The event ID.
     */
    var setSelectedEvent = function(id) {
      $scope.events[id].select();
    };

    /**
     * Set the selected item.
     *
     * @param int id
     *   The event ID.
     */
    var selectedAuthorId = function(id) {
      $scope.selectedAuthorId = id;
    };

    if ($stateParams.eventId) {
      setSelectedEvent($stateParams.eventId);
    }

    if ($stateParams.userId) {
      selectedAuthorId($stateParams.userId);
    }

    // Get list of chanels.
    var channels = channelManager.getChannels();

    angular.forEach(channels, function(channel) {
      channel.bind('new-event', function(data) {
        // Put new item in the begginning of the list.
        $scope.events.unshift(data[0]);
      });
    });

    // Select marker in the Map.
    $scope.$on('leafletDirectiveMarker.click', function(event, args) {
      var stateName = $stateParams.userId ? 'dashboard.byCompany.byUser.events.event' : 'dashboard.byCompany.events.event';
      $state.go(stateName, {eventId: parseInt(args.markerName)});
    });
  });
