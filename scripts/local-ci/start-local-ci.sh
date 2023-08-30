#!/bin/sh

set -x

docker container stop rutherford-site-webhook rutherford-site-server

docker image rm rutherford-site-webhook

cd scripts/local-ci

docker build . -t rutherford-site-webhook

cd ../../

# env-file should contain a line like GITHUB_WEBHOOK_SECRET=<secret goes here>
docker run --rm -d -p 58778:9000 \
    --name=rutherford-site-webhook \
    -v `pwd`:/site \
    --env-file=/keybase/team/rutherford_nj.website/local_ci.env \
    rutherford-site-webhook

docker run -d --rm -p 0.0.0.0:58777:8777 \
	--name=rutherford-site-server \
	-v `pwd`:/srv/jekyll \
	jekyll/builder:latest jekyll serve --watch -P 8777 -p /dev/null
