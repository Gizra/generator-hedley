#!/bin/sh
chmod -R 777 $TRAVIS_BUILD_DIR/phantomcss/failures
DIRECTORY=$TRAVIS_BUILD_DIR/phantomcss/failures

if [ -d "$DIRECTORY" ]; then
  for i in $DIRECTORY/*
    do
      bash $TRAVIS_BUILD_DIR/imgur $i
    done
else
  echo "No failure images were found"
fi

