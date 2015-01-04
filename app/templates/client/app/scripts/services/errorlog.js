'use strict';

/**
 * @ngdoc service
 * @name clientApp.errorLogService
 * @description
 * # errorLogService
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('ErrorLog', function ($log, $window, StackTrace, Config, loggly) {
    // Log the given error to the remote server.
    function log(exception, cause) {

      // Pass off the error to the default error handler
      // on the AngualrJS logger. This will output the
      // error to the console (and let the application
      // keep running normally for the user).
      $log.error.apply( $log, arguments );

      // Now, we need to try and log the error the server.
      // --
      // NOTE: In production, I have some debouncing
      // logic here to prevent the same client from
      // logging the same error over and over again! All
      // that would do is add noise to the log.
      try {

        var errorMessage = exception.toString();
        var stackTrace = StackTrace.print({ e: exception });

        var data = {
          errorUrl: $window.location.href,
          errorMessage: errorMessage,
          stackTrace: stackTrace,
          cause: cause || ''
        };

        if (Config.logglyApiKey) {
          // Log to the "loggly" service.
          // @todo: Move to app.config().
          loggly.setApiKey(Config.logglyApiKey);
          // @todo: We can only use loggly.log - loggly.error() doesn't pass
          // the json object properly.
          loggly.log(data);
        }
        else {
          // Log the JavaScript error to the server.
          $.ajax({
            type: 'POST',
            url: Config.logErrorUrl,
            contentType: 'application/json',
            data: data
          });
        }
      }
      catch (loggingError) {
        // For Developers - log the log-failure.
        $log.warn( "Error logging failed" );
        $log.log( loggingError );

      }
    }

    // Return the logging function.
    return( log );
  });
