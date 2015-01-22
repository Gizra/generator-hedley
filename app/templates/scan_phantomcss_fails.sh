#!/bin/sh

for i in ./phantomcss/failures/
  do
    bash $TRAVIS_BUILD_DIR/imgur bash $i
  done
