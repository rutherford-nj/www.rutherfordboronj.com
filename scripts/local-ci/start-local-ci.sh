#!/bin/sh

set -x

echo "Provide webhook secret:"
read WEBHOOK_SECRET

docker run --rm -d -p 58778:9000 --name=rutherford-site-webhook \
	-v `pwd`:/site \
	-e GITHUB_WEBHOOK_SECRET=$WEBHOOK_SECRET ghcr.io/rutherford-nj/rutherford-site-webhook:latest
