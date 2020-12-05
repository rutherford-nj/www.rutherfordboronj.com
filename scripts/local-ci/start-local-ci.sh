#!/bin/sh

set -x

docker run --rm -d -p 58778:9000 \
    --name=rutherford-site-webhook \
    -v `pwd`:/site \
    --env-file=/keybase/team/rutherford_nj.website/local_ci.env \
    ghcr.io/rutherford-nj/rutherford-site-webhook:latest
