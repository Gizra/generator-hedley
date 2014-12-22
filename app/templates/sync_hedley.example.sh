#!/bin/bash

################################################################################
#
# This script will sync back to the original generator.
#
#
################################################################################


GENERATOR_FOLDER="/var/www/generator-hedley"

# Client
rsync -avz --exclude '.*' --exclude 'client/node_modules' --exclude 'client/bower_components' ./client $GENERATOR_FOLDER/client

# Behat
rsync -avz --exclude 'behat/bin', 'behat/vendor', 'behat/behat.local.yml' ./behat $GENERATOR_FOLDER/behat

# Drupal - we make sure to hardcode the copy to "skeleton".
rsync -avz --exclude 'skeleton/modules/contrib' --exclude 'skeleton/themes/contrib' --exclude 'skeleton/libraries' ./skeleton $GENERATOR_FOLDER/skeleton



