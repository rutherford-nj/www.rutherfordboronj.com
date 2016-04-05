#!/bin/bash

for i in `find . -type f`;
do
  sed -i 's/https:\/\/storage.googleapis.com\//http:\/\//g' $i
done
