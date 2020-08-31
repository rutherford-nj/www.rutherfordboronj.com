#!/bin/sh

set -x

echo "Provide webhook secret:"
read WEBHOOK_SECRET

docker build --tag=rutherford-site-webhook scripts/local-ci

docker run -d -p 58778:9000 --name=rutherford-site-webhook \
	-v `pwd`:/site \
	-e GITHUB_WEBHOOK_SECRET=$WEBHOOK_SECRET rutherford-site-webhook
