#!/bin/bash

################################################################################
#
# Helper variables to print text using some colors.
#
################################################################################

# Restore to default colours
RESTORE='\033[0m'

# Simple colors
BLACK='\033[00;30m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\033[00;33m'
BLUE='\033[00;34m'
MAGENTA='\033[00;35m'
CYAN='\033[00;36m'
WHITE='\033[00;37m'

# Bold (lighter)
LBLACK='\033[01;30m'
LRED='\033[01;31m'
LGREEN='\033[01;32m'
LYELLOW='\033[01;33m'
LBLUE='\033[01;34m'
LMAGENTA='\033[01;35m'
LCYAN='\033[01;36m'
LWHITE='\033[01;37m'

# Predefined background colours
BGBLACK='\033[00;40;37m'
BGRED='\033[00;41;37m'
BGGREEN='\033[00;42;30m'
BGYELLOW='\033[00;43;30m'
BGBLUE='\033[00;44;37m'
BGMAGENTA='\033[00;45;30m'
BGCYAN='\033[00;46;30m'
BGWHITE='\033[00;47;30m'

# Predefined background colours with lighter foreground
BGLBLACK='\033[01;40;37m'
BGLRED='\033[01;41;37m'
BGLGREEN='\033[01;42;37m'
BGLYELLOW='\033[01;43;37m'
BGLBLUE='\033[01;44;37m'
BGLMAGENTA='\033[01;45;37m'
BGLCYAN='\033[01;46;37m'
BGLWHITE='\033[01;47;30m'

# Test all colors
function test_colors_all {
  echo
  echo "Standard colors"
  echo -e "${BLACK} BLACK text ${RESTORE} (BLACK)"
  echo -e "${RED} RED text ${RESTORE}"
  echo -e "${GREEN} GREEN text ${RESTORE}"
  echo -e "${YELLOW} YELLOW text ${RESTORE}"
  echo -e "${BLUE} BLUE text ${RESTORE}"
  echo -e "${MAGENTA} MAGENTA text ${RESTORE}"
  echo -e "${CYAN} CYAN text ${RESTORE}"
  echo -e "${WHITE} WHITE text ${RESTORE}"
  echo
  
  echo "Lighter colors"
  echo -e "${LBLACK} LBLACK text ${RESTORE} (LBLACK)"
  echo -e "${LRED} LRED text ${RESTORE}"
  echo -e "${LGREEN} LGREEN text ${RESTORE}"
  echo -e "${LYELLOW} LYELLOW text ${RESTORE}"
  echo -e "${LBLUE} LBLUE text ${RESTORE}"
  echo -e "${LMAGENTA} LMAGENTA text ${RESTORE}"
  echo -e "${LCYAN} LCYAN text ${RESTORE}"
  echo -e "${LWHITE} WHITE text ${RESTORE}"
  echo
  
  echo "BACKGROUND colors"
  echo -e "${BGBLACK} BGBLACK text ${RESTORE}"
  echo -e "${BGRED} BGRED text ${RESTORE}"
  echo -e "${BGGREEN} BGREEN text ${RESTORE}"
  echo -e "${BGYELLOW} BGYELLOW text ${RESTORE}"
  echo -e "${BGBLUE} BGBLUE text ${RESTORE}"
  echo -e "${BGMAGENTA} BGMAGENTA text ${RESTORE}"
  echo -e "${BGCYAN} BGCYAN text ${RESTORE}"
  echo -e "${BGWHITE} BGWHITE text ${RESTORE}"
  echo
  
  echo "BACKGROUND with lighter colors"
  echo -e "${BGLBLACK} BGLBLACK text ${RESTORE}"
  echo -e "${BGLRED} BGLRED text ${RESTORE}"
  echo -e "${BGLGREEN} BGLREEN text ${RESTORE}"
  echo -e "${BGLYELLOW} BGLYELLOW text ${RESTORE}"
  echo -e "${BGLBLUE} BGLBLUE text ${RESTORE}"
  echo -e "${BGLMAGENTA} BGLMAGENTA text ${RESTORE}"
  echo -e "${BGLCYAN} BGLCYAN text ${RESTORE}"
  echo -e "${BGLWHITE} BGLWHITE text ${RESTORE}"
  echo
}

