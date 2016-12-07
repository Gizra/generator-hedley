#!/bin/sh
set -e

# ---------------------------------------------------------------------------- #
#
# Installs The coder library so we can use t for code reviews.
#
# ---------------------------------------------------------------------------- #

if [ "$CODE_REVIEW" != 1 ]; then
 exit 0;
fi

cd $TRAVIS_BUILD_DIR
composer global require drupal/coder
phpcs --config-set installed_paths ~/.composer/vendor/drupal/coder/coder_sniffer
