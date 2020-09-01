#!/bin/sh 

set -x

cd /site
git fetch --all
git checkout $1

