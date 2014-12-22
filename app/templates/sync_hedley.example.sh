#!/bin/bash

################################################################################
#
# This script will sync back to the original generator.
#
#
################################################################################


GENERATOR_FOLDER="/var/www/generator-hedley"
PROFILE_NAME="skeleton"

# Client
rsync -avz --exclude '.*' ./client $GENERATOR_FOLDER/client

# Behat
rsync -avz --exclude 'bin', 'vendor', 'behat.local.yml' ./behat $GENERATOR_FOLDER/behat

# Drupal - we make sure to hardcode the copy to "skeleton".
rsync -avz --exclude 'contrib/' ./skeleton $GENERATOR_FOLDER/skeleton

