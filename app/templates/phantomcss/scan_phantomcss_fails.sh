#!/bin/sh

for i in ./failures/
  do
    bash $TRAVIS_BUILD_DIR/imgur bash $i
  done
