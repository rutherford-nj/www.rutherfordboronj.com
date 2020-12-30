#!/bin/sh

set -x

cd scripts/local-ci

docker build . -t rutherford-site-webhook

docker run --rm -d -p 58778:9000 \
    --name=rutherford-site-webhook \
    -v `pwd`:/site \
    --env-file=/keybase/team/rutherford_nj.website/local_ci.env \
    rutherford-site-webhook
