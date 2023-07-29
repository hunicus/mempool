#!/bin/bash

# -----------------------------------
# compile js from ts
# -----------------------------------

tsc ../api-docs-data.ts
tsc ../api-docs-code.ts

# -----------------------------------
# options:
# `node prebuild.js` to fetch responses for all endpoints without explicit values set in their responseSettings && with no cached response in api-docs-code.ts
# `node prebuild.js <fragment>` to fetch responses for the endpoint corresponding to the specified fragment (all networks)
# `node prebuild.js <fragment> <network>` to fetch responses for the endpoint corresponding to the specified fragment (only for specified network)
# `node prebuild.js force-reset-all` to fetch api responses for all endpoints without explicit values set in their responseSettings
# -----------------------------------

node prebuild.js $1 $2

# -----------------------------------
# remove js
# -----------------------------------

rm ../api-docs-data.js
rm ../api-docs-code.js

# -----------------------------------
# open browser windows to test if a fragment was specified
# -----------------------------------

BASE_MODULE=`jq .BASE_MODULE ../../../../../mempool-frontend-config.json`

if [[ -n "$1" && $1 != "force-reset-all" && -n "$2" ]]; then
    if [ "$2" == "mainnet" ]; then
        sleep 0.5
        firefox --new-tab https://mempool.space/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
    elif [ $2 == "signet" ]; then
        sleep 0.5
        firefox --new-tab https://mempool.space/signet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/signet/docs/api/rest#${1}
    elif [ $2 == "testnet" ]; then
        sleep 0.5
        firefox --new-tab https://mempool.space/testnet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/testnet/docs/api/rest#${1}
    elif [ $2 == "liquid" ]; then
        sleep 0.5
        firefox --new-tab https://liquid.network/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
    elif [ $2 == "liquidtestnet" ]; then
        sleep 0.5
        firefox --new-tab https://liquid.network/testnet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/testnet/docs/api/rest#${1}
    else # bisq
        sleep 0.5
        firefox --new-tab https://bisq.markets/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
    fi
elif [[ -n "$1" && $1 != "force-reset-all" ]]; then
    if [ "$BASE_MODULE" == "\"mempool\"" ]; then
        sleep 0.5
        firefox --new-tab https://mempool.space/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab https://mempool.space/signet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab https://mempool.space/testnet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab http://localhost:4200/signet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab http://localhost:4200/testnet/docs/api/rest#${1}
    elif [ $BASE_MODULE == "\"liquid\"" ]; then
        sleep 0.5
        firefox --new-tab https://liquid.network/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab https://liquid.network/testnet/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
        sleep 0.5
        firefox --new-tab http://localhost:4200/testnet/docs/api/rest#${1}
    else # bisq
        sleep 0.5
        firefox --new-tab https://bisq.markets/docs/api/rest#${1}
        sleep 0.5
        firefox --new-window http://localhost:4200/docs/api/rest#${1}
    fi
fi