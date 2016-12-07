#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Install client dependencies.
#
# ---------------------------------------------------------------------------- #

# Client dependencies has no use if profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

cd $TRAVIS_BUILD_DIR/client
npm install
bower install
cp config.travis.json config.json
