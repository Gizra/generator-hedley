#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Install Behat dependencies.
#
# ---------------------------------------------------------------------------- #

# Behat has no use if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

cd $TRAVIS_BUILD_DIR/behat
cp aliases.drushrc.php ~/.drush/
# Copy the travis specific behat config file.
cp behat.local.yml.travis behat.local.yml

# Install the behat dependencies.
composer install

cd $TRAVIS_BUILD_DIR
