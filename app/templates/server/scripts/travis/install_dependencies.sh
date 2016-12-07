#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Install dependencies.
#
# ---------------------------------------------------------------------------- #

# Dependencies has no use if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

# Install Bower, Grunt and CasperJs.
npm install -g bower grunt-cli

# Install Sass and Compass for Grunt to work.
gem install compass

# install php packages required for running a web server from drush on php 5.3
sudo apt-get install -y --force-yes php5-cgi php5-mysql

# Make the install executable.
cd $TRAVIS_BUILD_DIR
chmod +x install
