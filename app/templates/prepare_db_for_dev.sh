#!/usr/bin/env bash

# Define the root of the GIT repository.
cd ${0%/*}
ROOT=$(pwd)
cd $ROOT

# Load the colors.
source $ROOT/scripts/helper-colors.sh

# Trying to get the table name from the config.sh file.
if [ -f $ROOT/config.sh ]; then
  source $ROOT/config.sh
  TABLE_NAME="$MYSQL_DB_NAME"
fi

# Override table name if provided as an argument.
if [ $1 ]; then
  TABLE_NAME="$1"
fi

if [ ! $TABLE_NAME ]; then
    echo
    echo -e  "${BGRED}                                                     ${RESTORE}"
    echo -e "${BGLRED}  ERROR >>> Please provide a table name!             ${RESTORE}"
    echo -e  "${BGRED}     Example:                                        ${RESTORE}"
    echo -e  "${BGRED}         > bash prepare-db-for-dev.sh <table_name>   ${RESTORE}"
    echo -e  "${BGRED}                                                     ${RESTORE}"
    echo
    exit 1
fi

echo
echo -e "${BLUE}> You're about to modify a table named: ${LYELLOW}'$TABLE_NAME'${RESTORE}"
read -p "> Are you sure (y/n)? "

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit
fi

echo -e "${LBLUE}> Preparing your database for development.${RESTORE}"
cd $ROOT/www

echo
echo " > Changing the solr index to be read only."
mysql -uroot -e "UPDATE $TABLE_NAME.search_api_index SET read_only = '1'"

echo
echo " > Removing emails from all users."
mysql -uroot -e "UPDATE $TABLE_NAME.users SET mail = 'mail@example.invalid'"

echo
echo " > Enabling the devel module."
drush en devel -y

echo
echo " > Setting the error_level to display all the error messages."
drush vset error_level 2

echo
echo " > Disabling performance caching."
drush vset cache 0
drush vset block_cache 0
drush vset page_compression 0
drush vset preprocess_js 0
drush vset preprocess_css 0

echo
echo " > Disabling logs HTTP API (Loggly)."
drush vset logs_http_enabled 0

echo
echo " > Clearing all cache."
drush cc all
