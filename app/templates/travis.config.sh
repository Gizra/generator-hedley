#!/bin/bash

#########################################################################################
#
# Configuration used in the different scripts.
#
# Copy this file in the same directory, the filename of the copy should be "config.sh".
#
#########################################################################################


# The profile used to install the platform.
PROFILE_NAME="skeleton"
# The human name of the install profile
PROFILE_TITLE="Skeleton"


# Modify the URL below to match your local domain the site will be accessible on.
BASE_DOMAIN_URL="http://127.0.0.1:8080"


# Modify the login details below to be the desired
# login details for the Drupal Administrator account.
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin"
ADMIN_EMAIL="admin@example.com"


# Modify the MySQL settings below so they will match your own.
MYSQL_USERNAME="root"
MYSQL_PASSWORD=""
MYSQL_HOSTNAME="127.0.0.1"
MYSQL_DB_NAME="drupal"



##
# External folders or files that need to be symlinked into the www folder
# AFTER the make files have been processed.
#
# The variable is an array, add each with an unique index number.
# Each line should contain the source path > target path.
# The target path needs to be relative to the www folder (Drupal root).
#
# Example:
#   SYMLINKS[0]="path/to/the/source/folder>subpath/of/the/www-folder"
##
# SYMLINKS[0]="/var/www/library/foldername>sites/all/library/foldername"
# SYMLINKS[1]="/var/www/shared/filename.php>sites/all/modules/filename.php"



##
# Post script functions.
#
# These functions are called when the corresponding script has finshed and
# before the final check of the platform (and optional auto login).
#
# Add commands that need to be run per script.
# The colors, as defined in the scripts/helper-colors.sh file, can be used to
# highlight echoed text.
#
# Following variables can be used (created depending on the script arguments):
# - $DEMO_CONTENT (0/1) : Should the demo content be loaded into the platform.
# - $AUTO_LOGIN (0/1)   : Will the script open a browser window and log in as an
#                         administrator.
# - $UNATTENDED (0/1)   : Is the script run unattended.
##

# Post install script.
# function post_install {}

# Post upgrade script.
# function post_upgrade {}

# Post reset script.
# function post_reset {}
