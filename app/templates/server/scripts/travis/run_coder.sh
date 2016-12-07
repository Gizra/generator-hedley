#!/bin/sh

# ---------------------------------------------------------------------------- #
#
# Run the coder review.
#
# ---------------------------------------------------------------------------- #

# Do we need to run the coder review?
if [ "$CODE_REVIEW" -ne 1 ]; then
  exit 0
fi

HAS_ERRORS=0

##
# Function to run the actual code review
#
# This function takes 2 params:
# @param string $1
#   The file path to the directory or file to check.
# @param string $2
#   The ignore pattern(s).
##
code_review () {
  echo "${LWHITE}$1${RESTORE}"
  phpcs --standard=$REVIEW_STANDARD -p --colors --extensions=php,module,inc,install,test,profile,theme,js,css,info --ignore=$2 $1

  if [ $? -ne 0 ]; then
    HAS_ERRORS=1
  fi
}

# Review custom modules, run each folder separately to avoid memory limits.
PATTERNS="*.features.inc,*.features.*.inc,*.field_group.inc,*.strongarm.inc,*.ds.inc,*.context.inc,*.pages.inc,*.pages_default.inc,*.views_default.inc,*.file_default_displays.inc,*.facetapi_defaults.inc"

echo
echo "${LBLUE}> Sniffing skeleton Modules${RESTORE}"
echo
for dir in $TRAVIS_BUILD_DIR/skeleton/modules/custom/*/ ; do
  code_review $dir $PATTERNS
done

echo

exit $HAS_ERRORS
