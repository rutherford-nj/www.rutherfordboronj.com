#!/bin/bash

if [ -z "$SITE_WORKSPACE" ]; then
	exit 1
fi

if [ -d node_modules ]; then
  echo "node_modules exists"
else
  docker run --rm \
	-v $SITE_WORKSPACE:/srv/jekyll \
	jekyll/builder:latest /bin/bash -c "npm install"
fi
