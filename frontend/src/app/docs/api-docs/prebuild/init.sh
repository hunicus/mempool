#!/bin/bash

# compile js from ts
#tsc ../api-docs-data.ts

# options for $1:
# default (no parameter passed) will get responses for all endpoints where freeze=false
# 'force-reset-all' to get responses for all endpoints (except those marked 'manual')
# '<fragment>' to get responses for specific endpoint
node prebuild.js $1

#rm ../api-docs-data.js