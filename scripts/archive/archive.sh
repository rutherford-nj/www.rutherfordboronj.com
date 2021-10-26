#!/bin/bash

apt update
yes | apt install zip

YEAR=`date +"%Y"`

function archive {
  gsutil -m cp -r gs://static.rutherford-nj.com/borough-clerk/$1/agendas .
  gsutil -m cp -r gs://static.rutherford-nj.com/borough-clerk/$1/minutes .

  mv agendas $YEAR-agendas
  mv minutes $YEAR-minutes

  ZIPFILE=$YEAR-$1.zip
 
  zip -r $ZIPFILE $YEAR-agendas $YEAR-minutes

  mv $ZIPFILE /work/artifacts
}

archive $1