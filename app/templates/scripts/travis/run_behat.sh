#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Run the behat tests.
#
# ---------------------------------------------------------------------------- #


# No need for Behat if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

# Run behat tests
cd $TRAVIS_BUILD_DIR/behat
./bin/behat --tags=~@wip

cd $TRAVIS_BUILD_DIR
