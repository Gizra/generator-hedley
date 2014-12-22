#!/bin/bash

################################################################################
#
# This script will setup a local copy of Drupal 7
# based on the Installation Profile.
#
# Do not change the content of this file,
# all configuration variables are in the config.sh file.
#
################################################################################


GENERATOR_FOLDER="/var/www/generator-hedley"

rsync -avz --exclude '.git' jekyll/dist/ ethosia/libraries/ethosia
