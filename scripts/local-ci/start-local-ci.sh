#!/bin/sh

set -x

echo "Provide webhook secret:"
read WEBHOOK_SECRET

docker container stop rutherford-site-webhook rutherford-site-server
docker image prune -a

docker build --tag=rutherford-site-webhook scripts/local-ci

docker run --rm -d -p 58778:9000 --name=rutherford-site-webhook \
	-v `pwd`:/site \
	-e GITHUB_WEBHOOK_SECRET=$WEBHOOK_SECRET rutherford-site-webhook
