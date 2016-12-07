#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Installs Drush.
#
# ---------------------------------------------------------------------------- #

# No need for Drush if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

# Install Drush.
cd $TRAVIS_BUILD_DIR
composer global require drush/drush:6.*
phpenv rehash

drush --version
