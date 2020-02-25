#!/bin/bash

read -s -p "Server password: " SERVER_PASSWORD
docker run -it --env PASSWORD=$SERVER_PASSWORD --rm -p 127.0.0.1:8080:8080 -v "$PWD:/home/coder/rutherford" codercom/code-server
