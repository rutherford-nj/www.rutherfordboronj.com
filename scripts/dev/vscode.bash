#!/bin/bash

read -s -p "Server password: " SERVER_PASSWORD
docker run -it --env PASSWORD=$SERVER_PASSWORD --rm -p 0.0.0.0:8080:8080 \
  -v ~/.bash_aliases:/home/coder/.bash_aliases \
  -v ~/.gitconfig:/home/coder/.gitconfig \
  -v ~/.ssh:/home/coder/.ssh \
  -v "$PWD:/home/coder/rutherford" \
  codercom/code-server
