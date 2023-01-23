#!/bin/bash

# compile js from ts
tsc ../api-docs-data.ts
tsc ../api-docs-code.ts

# options for $1:
# passing no parameter will get responses for all endpoints where freeze=false
# pass 'force-reset-all' to get responses for all endpoints (except those where skip=true)
# pass '<fragment>' to get responses for specific endpoint
node prebuild.js $1

rm ../api-docs-data.js
rm ../api-docs-code.js