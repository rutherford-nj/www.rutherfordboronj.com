# Adapted from https://hub.docker.com/r/almir/webhook/dockerfile

FROM        golang:alpine3.12 AS build
WORKDIR     /go/src/github.com/adnanh/webhook
ENV         WEBHOOK_VERSION 2.7.0
RUN         apk add --update -t build-deps curl libc-dev gcc libgcc
RUN         curl -L --silent -o webhook.tar.gz https://github.com/adnanh/webhook/archive/${WEBHOOK_VERSION}.tar.gz && \
            tar -xzf webhook.tar.gz --strip 1 &&  \
            go get -d && \
            go build -o /usr/local/bin/webhook && \
            apk del --purge build-deps && \
            rm -rf /var/cache/apk/* && \
            rm -rf /go

FROM        alpine:3.12
COPY        --from=build /usr/local/bin/webhook /usr/local/bin/webhook
RUN         apk update && apk add git && mkdir /etc/webhook
COPY        ./update.sh ./hooks.json /etc/webhook/
EXPOSE      9000
ENTRYPOINT  ["/usr/local/bin/webhook", "-verbose", "-hotreload", "-template", "-hooks", "/etc/webhook/hooks.json"]
