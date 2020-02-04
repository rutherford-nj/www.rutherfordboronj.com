#!/bin/bash

if [ -d node_modules ]; then
  echo "node_modules exists"
else
  docker run \
	-v $(SITE_WORKSPACE):/srv/jekyll \
	jekyll/builder:latest /bin/bash -c "npm install"
fi
