#!/bin/bash

# compile js from ts
tsc ../api-docs-data.ts
tsc ../api-docs-code.ts

# options for $1:
# `node prebuild.js` to fetch responses for all endpoints without explicit values set in their responseSettings && with no cached response in api-docs-code.ts
# `node prebuild.js <fragment>` to fetch responses for the endpoint corresponding to the specified fragment (all networks)
# `node prebuild.js <fragment> <network>` to fetch responses for the endpoint corresponding to the specified fragment (only for specified network)
# `node prebuild.js force-reset-all` to fetch api responses for all endpoints without explicit values set in their responseSettings
node prebuild.js $1 $2

rm ../api-docs-data.js
rm ../api-docs-code.js