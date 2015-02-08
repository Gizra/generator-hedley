#!/bin/sh

for i in $TRAVIS_BUILD_DIR/phantomcss/failures/*
  do
    bash $TRAVIS_BUILD_DIR/imgur $i
  done
