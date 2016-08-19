#!/bin/sh

bq rm storageanalysis.static_usage
bq rm storageanalysis.www_usage
bq mk storageanalysis
curl -o /dev/shm/cloud-schema http://storage.googleapis.com/pub/cloud_storage_usage_schema_v0.json
bq load --skip_leading_rows=1 storageanalysis.static_usage \
  gs://static-dot-rutherford-nj-dot-com-storagelogs/static.rutherford-nj.com_usage* \
  /dev/shm/cloud-schema
bq load --skip_leading_rows=1 storageanalysis.www_usage \
  gs://www-dot-rutherford-nj-dot-com-storagelogs/www.rutherford-nj.com_usage* \
  /dev/shm/cloud-schema
