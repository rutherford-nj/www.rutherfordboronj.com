#!/bin/bash

docker run -it --rm -p 127.0.0.1:8080:8080 -v "$PWD:/home/coder/rutherford" codercom/code-server
