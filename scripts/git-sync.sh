#!/bin/sh

eval $(ssh-agent) && ssh-add
git pull
