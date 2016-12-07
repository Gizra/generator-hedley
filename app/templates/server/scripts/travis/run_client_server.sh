#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Run the client server.
#
# ---------------------------------------------------------------------------- #


# No need for client server if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

# Serve the client.
cd $TRAVIS_BUILD_DIR/client
grunt serve > ~/grunt.log 2>&1 &

cd $TRAVIS_BUILD_DIR

# Create display.
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start

# Wait for Grunt to finish loading.
until $(curl --output /dev/null --silent --head --fail http://localhost:9000); do sleep 1; echo '.'; done

# Run phantomJs.
phantomjs --webdriver=4444 > ~/phantomjs.log 2>&1 &
