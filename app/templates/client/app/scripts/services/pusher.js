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
     * Get Company channel.
     *
     * @param companyId
     *  Company id.
     *
     * @returns {*}
     *  Return company's channel.
     */
    this.getChannel =  function (companyId) {
      return (companyId in channels) ? channels[companyId] : null;
    };

    /**
     * Add new company's chanel.
     *
     * @param companyId
     *  User id.
     *
     * @returns {*}
     *  Return new company's channel.
     */
    this.addChannel = function (companyId) {
      if (!!channels[companyId]) {
        // Already subscribed to channel.
        return;
      }
      var pusher = $pusher(this.getClient());
      channels[companyId] = pusher.subscribe('private-company-' + companyId);
      return channels[companyId];
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
