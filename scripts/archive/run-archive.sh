#!/bin/bash

mkdir -p work/artifacts

docker run --rm \
  -v $PWD/work:/work \
  -v $PWD/scripts/archive/archive.sh:/archive.sh \
  google/cloud-sdk:slim \
  /archive.sh "mayor-and-council"

docker run --rm \
  -v $PWD/work:/work \
  -v $PWD/scripts/archive/archive.sh:/archive.sh \
  google/cloud-sdk:slim \
  /archive.sh "board-of-adjustment"

docker run --rm \
  -v $PWD/work:/work \
  -v $PWD/scripts/archive/archive.sh:/archive.sh \
  google/cloud-sdk:slim \
  /archive.sh "planning-board"
