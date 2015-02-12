#!/bin/sh
DIRECTORY=./failures

if [ -d "$DIRECTORY" ]; then
  for i in $DIRECTORY/*
    do
      bash $TRAVIS_BUILD_DIR/imgur $i
    done
else
  echo "No failure images were found"
fi

