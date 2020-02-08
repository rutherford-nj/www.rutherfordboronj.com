#!/bin/bash

# Set workspace for local builds.
[[ "$SITE_WORKSPACE" == "" ]] && \
    SITE_WORKSPACE=`pwd`

if [ -d node_modules ]; then
  echo "node_modules exists"
else
  docker run --rm \
	-v $SITE_WORKSPACE:/srv/jekyll \
	jekyll/builder:latest /bin/bash -c "npm install"
fi
