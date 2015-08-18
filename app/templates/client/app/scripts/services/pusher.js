'use strict';

/**
 * @ngdoc service
 * @name clientApp.account
 * @description
 * # account
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('channelManager', function ($q, $http, $timeout, $pusher, $log, Config, Auth) {

    var channels = {};


    this.pusher = null;

    /**
     * Get all pusher channels.
     *
     * @returns {{}}
     *  Return list of existing channels.
     */
    this.getChannels =  function () {
      return channels;
    };

    /**
     * Get repository channel.
     *
     * @param userId
     *  User id.
     *
     * @returns {*}
     *  Return user's channel.
     */
    this.getChannel =  function (userId) {
      return (userId in channels) ? channels[userId] : null;
    };

    /**
     * Add new user's chanel.
     *
     * @param userId
     *  User id.
     *
     * @returns {*}
     *  Return new user's channel.
     */
    this.addChannel = function (userId) {
      if (!!channels['uid' + userId]) {
        // Already subscribed to channel.
        return;
      }
      var pusher = $pusher(this.getClient());
      channels['uid' + userId] = pusher.subscribe('private-uid-' + userId);
      return channels['uid' + userId];
    };

    this.getClient = function() {
      return this.pusher ? this.pusher : this.createNewPusher();
    };

    this.createNewPusher = function() {
      var pusherConf = {
        authEndpoint: Config.backend + '/api/v1.0/pusher_auth',
        auth: {
          headers: {
            "access-token": Auth.getAccessToken()
          }
        }
      };
      this.pusher = new Pusher(Config.pusherKey, pusherConf);
      return this.pusher;
    };

  });
