#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Install Drupal profile.
#
# ---------------------------------------------------------------------------- #

# Profile should not be installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

cd $TRAVIS_BUILD_DIR
cp travis.config.sh config.sh
./install -dy
