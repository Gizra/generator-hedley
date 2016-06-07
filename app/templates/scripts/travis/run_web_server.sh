#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Run the web server.
#
# ---------------------------------------------------------------------------- #


# No need for web server if the profile is not installed.
if [ "$INSTALL_PROJECT" -ne 1 ]; then
 exit 0;
fi

# start a web server on port 8080, run in the background; wait for initialization.
drush @site runserver 127.0.0.1:8080 &
until netstat -an 2>/dev/null | grep '8080.*LISTEN'; do true; done
