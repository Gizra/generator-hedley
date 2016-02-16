#!/usr/bin/env bash

# Returns true if module is enabled, false otherwise.
function module_is_enable() {
  local MODULE_IS_ENABLED="`drush pm-list --pipe --type=module --status=enabled --no-core | grep $1`"
  if [ -z "$MODULE_IS_ENABLED" ]; then
    # Module is disabled.
    return 1
  else
    # Module is enabled.
    return 0
  fi
}

# Define the root of the GIT repository.
cd ${0%/*}
ROOT=$(pwd)
cd $ROOT

# Load the colors.
source $ROOT/scripts/helper-colors.sh

echo
echo -e "${BLUE} > You're about to modify your database.${RESTORE}"
read -p "Are you sure (y/n)? "

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit
fi

echo
echo -e "${LBLUE} > Preparing your database for development.${RESTORE}"

cd $ROOT/www

if module_is_enable "search_api"; then
  # If this module was never enabled on the current project then the
  # "search_api_index" table was never exists and we get the message
  # "Query failed".
  echo
  echo -e "${LBLUE} > Changing the solr index to be read only.${RESTORE}"
  drush sqlq "UPDATE search_api_index SET read_only = '1'"
fi

echo
echo -e "${LBLUE} > Removing Pantheon Apache Solr settings.${RESTORE}"
# Disabling pantheon modules.
drush sqlq "UPDATE system SET status = 0 WHERE name LIKE '%pantheon%'"
# Removing this variable prevent a fatal error since Pantheon set this variable
# but we don't have this class locally.
drush vdel apachesolr_service_class --yes

echo
echo -e "${LBLUE} > Modifying users emails.${RESTORE}"
drush sqlq "UPDATE users SET mail = concat(mail, '.test') WHERE uid > 0"

echo
echo -e "${LBLUE} > Enabling the devel module.${RESTORE}"
drush en devel -y

echo
echo -e "${LBLUE} > Setting the error_level to display all the error messages.${RESTORE}"
drush vset error_level 2

echo
echo -e "${LBLUE} > Disabling performance caching.${RESTORE}"
drush vset cache 0
drush vset block_cache 0
drush vset page_compression 0
drush vset preprocess_js 0
drush vset preprocess_css 0

echo
echo -e "${LBLUE} > Disabling logs HTTP API (Loggly).${RESTORE}"
drush vset logs_http_enabled 0

echo
echo -e "${LBLUE} > Clearing all cache.${RESTORE}"
drush cc all
