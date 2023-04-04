const bitcoinNetworks = ["mainnet", "testnet", "signet"];
const liquidNetworks = ["liquid", "liquidtestnet"];

const miningTimeIntervals = "<code>24h</code>, <code>3d</code>, <code>1w</code>, <code>1m</code>, <code>3m</code>, <code>6m</code>, <code>1y</code>, <code>2y</code>, <code>3y</code>";

const showCodeExamples = { 
  //"network": [curl, commonjs, esmodule, python]
  "mainnet": [ true, true, true, false ],
  "testnet": [ true, true, true, false ],
  "signet": [ true, true, true, false ],
  "bisq": [ true, true, true, false ],
  "liquid": [ true, true, true, false ],
  "liquidtestnet": [ true, false, false, false ]
};

function toggleCodeExampleVisibility( changes ) {
  let newShowCodeExamples = {};
  Object.assign( newShowCodeExamples, showCodeExamples );
  Object.assign( newShowCodeExamples, changes );
  return newShowCodeExamples;
}

export const wsApiDocsData = {
  /*showCodeExamples: showCodeExamples,
  codeTemplate: {
    curl: `/api/v1/ws`,
    commonjs: `
        const { %{0}: { websocket } } = mempoolJS();

        const ws = websocket.initClient({
          options: ['blocks', 'stats', 'mempool-blocks', 'live-2h-chart'],
        });

        ws.addEventListener('message', function incoming({data}) {
          const res = JSON.parse(data.toString());
          if (res.block) {
            document.getElementById("result-blocks").textContent = JSON.stringify(res.block, undefined, 2);
          }
          if (res.mempoolInfo) {
            document.getElementById("result-mempool-info").textContent = JSON.stringify(res.mempoolInfo, undefined, 2);
          }
          if (res.transactions) {
            document.getElementById("result-transactions").textContent = JSON.stringify(res.transactions, undefined, 2);
          }
          if (res["mempool-blocks"]) {
            document.getElementById("result-mempool-blocks").textContent = JSON.stringify(res["mempool-blocks"], undefined, 2);
          }
        });
  `,
    esmodule: `
  const { %{0}: { websocket } } = mempoolJS();

  const ws = websocket.initServer({
    options: ["blocks", "stats", "mempool-blocks", "live-2h-chart"],
  });

  ws.on("message", function incoming(data) {
    const res = JSON.parse(data.toString());
    if (res.block) {
      console.log(res.block);
    }
    if (res.mempoolInfo) {
      console.log(res.mempoolInfo);
    }
    if (res.transactions) {
      console.log(res.transactions);
    }
    if (res["mempool-blocks"]) {
      console.log(res["mempool-blocks"]);
    }
  });
    `,
    python: `import websocket
import _thread
import time
import rel
import json

rel.safe_read()

def on_message(ws, message):
    print(json.loads(message))

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    message = { "action": "init" }
    ws.send(json.dumps(message))
    message = { "action": "want", "data": ['blocks', 'stats', 'mempool-blocks', 'live-2h-chart', 'watch-mempool'] }
    ws.send(json.dumps(message))

if __name__ == "__main__":
    ws = websocket.WebSocketApp("wss://mempool.space/api/v1/ws",
                              on_open=on_open,
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever(dispatcher=rel)  # Set dispatcher to automatic reconnection
    rel.signal(2, rel.abort)  # Keyboard Interrupt
    rel.dispatch()
    `,
  },
  codeSampleMainnet: emptyCodeSample,
  codeSampleTestnet: emptyCodeSample,
  codeSampleSignet: emptyCodeSample,
  codeSampleLiquid: emptyCodeSample,
  codeSampleBisq: emptyCodeSample,*/
};

export const restApiDocsData = [
  {
    type: "category",
    category: "general",
    fragment: "general",
    title: "General",
    showConditions: bitcoinNetworks.concat(["bisq"])
  },
  {
    type: "endpoint",
    category: "general",
    httpRequestMethod: "GET",
    fragment: "get-difficulty-adjustment",
    title: "GET Difficulty Adjustment",
    showConditions: bitcoinNetworks,
    showCodeExamples: showCodeExamples,
    description: "Returns details about difficulty adjustment.",
    codeTemplates: {
      curl: {
        template: `/v1/difficulty-adjustment`
      },
      commonjs: {
        template: `const { %{0}: { difficulty } } = mempoolJS(); const difficultyAdjustment = await difficulty.getDifficultyAdjustment(); document.getElementById("result").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);`
      },
      esmodule: {
        template: `const { %{0}: { difficulty } } = mempoolJS(); const difficultyAdjustment = await difficulty.getDifficultyAdjustment(); console.log(difficultyAdjustment);`
      }
    }
  },
  {
    type: "endpoint",
    category: "general",
    httpRequestMethod: "GET",
    fragment: "get-stats",
    title: "GET Stats",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Returns statistics about all Bisq transactions.",
    codeTemplates: {
      curl: {
        template: `/stats`
      },
      commonjs: { 
        template: `const { %{0}: { statistics } } = mempoolJS(); const stats = await statistics.getStats(); document.getElementById("result").textContent = JSON.stringify(stats, undefined, 2);`
      },
      esmodule: {
        template: `const { %{0}: { statistics } } = mempoolJS(); const stats = await statistics.getStats(); console.log(stats);`
      }
    }
  },
  {
    type: "category",
    category: "markets",
    fragment: "markets",
    title: "Markets",
    showConditions: [ "bisq" ]
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-currencies",
    title: "GET Market Currencies",
    showConditions: ["bisq"],
    showCodeExamples: showCodeExamples,
    description: "Provides list of available currencies for a given base currency.",
    codeTemplates: {
      curl: {
          template: `/currencies`
      },
      commonjs: {
          template: `const { %{0}: { markets } } = mempoolJS(); const currencies = await markets.getCurrencies(); document.getElementById("result").textContent = JSON.stringify(currencies, undefined, 2);`
      },
      esmodule: {
          template: `const { %{0}: { markets } } = mempoolJS(); const currencies = await markets.getCurrencies(); console.log(currencies);`
      }
    },
    responseSettings: {
      explicit: `{ "BTC": { "code": "BTC", "name": "Bitcoin", "precision": 8, "_type": "crypto" }, "USD": { "code": "USD", "name": "US Dollar", "precision": 8, "_type": "fiat" }, "...": "..." }`
    }
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-depth",
    title: "GET Market Depth",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides list of open offer prices for a single <code>:market</code>.",
    codeTemplates: {
      curl: {
        template: `/depth?market=%{1}`
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const depth = await markets.getDepth({ market }); document.getElementById(\"result\").textContent = JSON.stringify(depth, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const depth = await markets.getDepth({ market }); console.log(depth);"
      }
    },
    parameters: [
      {
        label: 'market',
        exampleValue: 'BTC_USD',
        required: true,
        urlParam: true
      }
    ],
    responseSettings: {
      maxArrayLength: 5
    }
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-hloc",
    title: "GET Market HLOC",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides hi/low/open/close data for a given <code>:market</code>. This can be used to generate a candlestick chart.",
    codeTemplates: {
      curl: {
        template: "/hloc?market=%{1}"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const hloc = await markets.getHloc({ market }); document.getElementById(\"result\").textContent = JSON.stringify(hloc, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const hloc = await markets.getHloc({ market }); console.log(hloc);"
      }
    },
    parameters: [
      {
         label: 'market',
         exampleValue: 'BTC_USD',
         required: true,
         urlParam: true
      }  
    ]
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-markets",
    title: "GET Markets",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides list of available markets.",
    codeTemplates: {
      curl: {
        template: "/markets"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const allMarkets = await markets.getMarkets(); document.getElementById(\"result\").textContent = JSON.stringify(allMarkets, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const allMarkets = await markets.getMarkets(); console.log(allMarkets);"
      }
    },
    responseSettings: {
      explicit: `{  "btc_eur": { "pair": "btc_eur", "lname": "Bitcoin", "rname": "Euro", "lsymbol": "BTC", "rsymbol": "EUR", "lprecision": 8, "rprecision": 2, "ltype": "crypto", "rtype": "fiat", "name": "Bitcoin/Euro" }, "btc_usd": { "pair": "btc_usd", "lname": "Bitcoin", "rname": "US Dollar", "lsymbol": "BTC", "rsymbol": "USD", "lprecision": 8, "rprecision": 2, "ltype": "crypto", "rtype": "fiat", "name": "Bitcoin/US Dollar" }, "...": "..." }`
    }
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-offers",
    title: "GET Market Offers",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides list of open offer details for a single <code>:market</code>.",
    codeTemplates: {
      curl: {
        template: "/offers?market=%{1}"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const offers = await markets.getOffers({ market }); document.getElementById(\"result\").textContent = JSON.stringify(offers, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const offers = await markets.getOffers({ market }); console.log(offers);"
      }
    },
    parameters: [
      {
         label: 'market',
         exampleValue: 'BTC_USD',
         required: true,
         urlParam: true
      }  
    ]
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-ticker",
    title: "GET Market Ticker",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides 24-hour price ticker. Pass a <code>:market</code> parameter for ticker on a single market, or pass no parameter for tickers on all markets.",
    codeTemplates: {
      curl: {
        template: "/ticker?market=%{1}"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const ticker = await markets.getTicker({ market }); document.getElementById(\"result\").textContent = JSON.stringify(ticker, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const ticker = await markets.getTicker({ market }); console.log(ticker);"
      }
    },
    parameters: [
      {
         label: 'market',
         exampleValue: 'BTC_USD',
         required: false,
         urlParam: true
      }  
    ],  
    responseSettings: {
      explicit: `{ "last": "24307.26980000", "high": "25223.99990000", "low": "23031.95480000", "volume_left": "1.40500000", "volume_right": "33607.08150000", "buy": "22836.22140000", "sell": "23775.47020000" }` }
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-trades",
    title: "GET Market Trades",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides list of completed trades for a single <code>:market</code>. Specify the number of trades to return with <code>:limit</code>, otherwise, the last 100 trades are returned.",
    codeTemplates: {
      curl: {
        template: "/trades?market=%{1}&limit=%{2}"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const trades = await markets.getTrades({ market, limit: %{2} }); document.getElementById(\"result\").textContent = JSON.stringify(trades, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const trades = await markets.getTrades({ market, limit: %{2} }); console.log(trades);"
      }
    },
    parameters: [
      {
         label: 'market',
         exampleValue: 'BTC_USD',
         required: true,
         urlParam: true
      },
      {
        label: 'limit',
        exampleValue: '2',
        required: false,
        urlParam: true
     }
    ]
  },
  {
    type: "endpoint",
    category: "markets",
    httpRequestMethod: "GET",
    fragment: "get-market-volumes",
    title: "GET Market Volumes",
    showConditions: [ "bisq" ],
    showCodeExamples: showCodeExamples,
    description: "Provides periodic volume data in terms of base currency for one or all markets.",
    codeTemplates: {
      curl: {
        template: "/volumes?basecurrency=%{1}"
      },
      commonjs: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const volumes = await markets.getVolumes({ market }); document.getElementById(\"result\").textContent = JSON.stringify(volumes, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { markets } } = mempoolJS(); const market = \"%{1}\"; const volumes = await markets.getVolumes({ market }); console.log(volumes);"
      }
    },
    parameters: [
      {
         label: 'basecurrency',
         exampleValue: 'USD',
         required: true,
         urlParam: true
      }  
    ]
  },
  {
    type: "category",
    category: "addresses",
    fragment: "addresses",
    title: "Addresses",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"])
  },
  {
    type: "endpoint",
    category: "addresses",
    httpRequestMethod: "GET",
    fragment: "get-address",
    title: "GET Address",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    description: "Returns details about an <code>:address</code>.",
    codeTemplates: {
      curl: {
        template: "/address%{1}"
      },
      commonjs: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const myAddress = await addresses.getAddress({ address }); document.getElementById(\"result\").textContent = JSON.stringify(myAddress, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const myAddress = await addresses.getAddress({ address }); console.log(myAddress);"
      }
    },
    parameters: [
      {
         label: 'address',
         exampleValue: '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qs45jstr4s34gjr8vnttlpzpw9qc5vvr4nylxyw',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48',
           required: true,
           urlParam: false
        }
      ]
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tex1qw08xw2arl6w0dwurhnalrn936fwutmy43d0336',
           required: true,
           urlParam: false
        }  
      ]  
    },
    bisq: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'B1DgwRN92rdQ9xpEVCdXRfgeqGw9X4YtrZz',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        maxArrayLength: 1
      }
    }
  },
  {
    type: "endpoint",
    category: "addresses",
    httpRequestMethod: "GET",
    fragment: "get-address-transactions",
    title: "GET Address Transactions",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Get transaction history for the specified address/scripthash, sorted with newest first. Returns up to 50 mempool transactions plus the first 25 confirmed transactions. You can request more confirmed transactions using <code>:last_seen_txid</code> (see below).",
    codeTemplates: {
      curl: {
        template: "/address%{1}/txs"
      },
      commonjs: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxs = await addresses.getAddressTxs({ address }); document.getElementById(\"result\").textContent = JSON.stringify(addressTxs, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxs = await addresses.getAddressTxs({ address }); console.log(addressTxs);"
      }
    },
    responseSettings: {
      maxArrayLength: 1
    },
    parameters: [
      {
         label: 'address',
         exampleValue: '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qs45jstr4s34gjr8vnttlpzpw9qc5vvr4nylxyw',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'vjTwFjtVE7Fy9gjwQSxas9FkrqcnK1SeobPkdD9tghdNmCvxoXhSeCjpgD3ponKJukkD2BNPX25dZL48',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "addresses",
    httpRequestMethod: "GET",
    fragment: "get-address-transactions-chain",
    title: "GET Address Transactions Chain",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Get confirmed transaction history for the specified address/scripthash, sorted with newest first. Returns 25 transactions per page. More can be requested by specifying the last txid seen by the previous query.",
    codeTemplates: {
      curl: {
        template: "/address%{1}/txs/chain"
      },
      commonjs: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsChain = await addresses.getAddressTxsChain({ address }); document.getElementById(\"result\").textContent = JSON.stringify(addressTxsChain, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsChain = await addresses.getAddressTxsChain({ address }); console.log(addressTxsChain);"
      }
    },
    responseSettings: {
      maxArrayLength: 1
    },
    parameters: [
      {
         label: 'address',
         exampleValue: '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qs45jstr4s34gjr8vnttlpzpw9qc5vvr4nylxyw',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'vjTwFjtVE7Fy9gjwQSxas9FkrqcnK1SeobPkdD9tghdNmCvxoXhSeCjpgD3ponKJukkD2BNPX25dZL48',
           required: true,
           urlParam: false
        }  
      ]  
    }
  },
  {
    type: "endpoint",
    category: "addresses",
    httpRequestMethod: "GET",
    fragment: "get-address-transactions-mempool",
    title: "GET Address Transactions Mempool",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Get unconfirmed transaction history for the specified address/scripthash. Returns up to 50 transactions (no paging).",
    codeTemplates: {
      curl: {
        template: "/address%{1}/txs/mempool"
      },
      commonjs: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsMempool = await addresses.getAddressTxsMempool({ address }); document.getElementById(\"result\").textContent = JSON.stringify(addressTxsMempool, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsMempool = await addresses.getAddressTxsMempool({ address }); console.log(addressTxsMempool);"
      }
    },
    responseSettings: {
      maxArrayLength: 1
    },
    parameters: [
      {
         label: 'address',
         exampleValue: 'bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1qhpv2m3jgh79x3atlzj5lwz8xxe5dpull4jdqe9',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1q7kf9gytkpuu5nwkmnjgqx6g4rdncq7v4uy9qly',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'H1bvbKJff1UEKQ6aPjTLCYgaSezuJ4Xz1Q',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tex1qyu558n4hn04qph5nukje5y5wyp3vd9rl3nenmh',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "addresses",
    httpRequestMethod: "GET",
    fragment: "get-address-utxo",
    title: "GET Address UTXO",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Get the list of unspent transaction outputs associated with the address/scripthash. Available fields: <code>txid</code>, <code>vout</code>, <code>value</code>, and <code>status</code> (with the status of the funding tx).",
    codeTemplates: {
      curl: {
        template: "/address%{1}/utxo"
      },
      commonjs: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address }); document.getElementById(\"result\").textContent = JSON.stringify(addressTxsUtxo, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { addresses } } = mempoolJS(); const address = '%{1}'; const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address }); console.log(addressTxsUtxo);"
      }
    },
    parameters: [
      {
         label: 'address',
         exampleValue: '1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1q4kgratttzjvkxfmgd95z54qcq7y6hekdm3w56u',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'address',
           exampleValue: 'tb1phgljew9chp3ec0y6qm75ml8farfq4055kzj8dqrta3ftk30y95tqg7s05m',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      description: "Get the list of unspent transaction outputs associated with the address/scripthash. Available fields: <code>txid</code>, <code>vout</code>, <code>value</code>, and <code>status</code> (with the status of the funding tx). There is also a <code>valuecommitment</code> field that may appear in place of <code>value</code>, plus the following additional fields: <code>asset</code>/<code>assetcommitment</code>, <code>nonce</code>/<code>noncecommitment</code>, <code>surjection_proof</code>, and <code>range_proof</code>.",
      parameters: [
        {
           label: 'address',
           exampleValue: 'H2SgrTGaFpmJ7rBz6UntS3qY9urUfocVoU',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      description: "Get the list of unspent transaction outputs associated with the address/scripthash. Available fields: <code>txid</code>, <code>vout</code>, <code>value</code>, and <code>status</code> (with the status of the funding tx). There is also a <code>valuecommitment</code> field that may appear in place of <code>value</code>, plus the following additional fields: <code>asset</code>/<code>assetcommitment</code>, <code>nonce</code>/<code>noncecommitment</code>, <code>surjection_proof</code>, and <code>range_proof</code>.",
      parameters: [
        {
           label: 'address',
           exampleValue: 'tex1qm48my9kxutdhcj7n828nwa6kuq83qva9s55rr5',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "category",
    category: "assets",
    fragment: "assets",
    title: "Assets",
    showConditions: liquidNetworks
  },
  {
    type: "endpoint",
    category: "assets",
    httpRequestMethod: "GET",
    fragment: "get-asset",
    title: "GET Asset",
    showConditions: liquidNetworks,
    showCodeExamples: showCodeExamples,
    description: "Returns information about a Liquid asset.",
    codeTemplates: {
      curl: {
        template: "/asset%{1}"
      },
      commonjs: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const asset = await assets.getAsset({ asset_id }); document.getElementById(\"result\").textContent = JSON.stringify(asset, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const asset = await assets.getAsset({ asset_id }); console.log(asset);"
      }
    },
    parameters: [
      {
         label: 'asset_id',
         exampleValue: '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d',
         required: true,
         urlParam: false
      }  
    ],
    liquidtestnet: {
      parameters: [
        {
           label: 'asset_id',
           exampleValue: 'ac3e0ff248c5051ffd61e00155b7122e5ebc04fd397a0ecbdd4f4e4a56232926',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "assets",
    httpRequestMethod: "GET",
    fragment: "get-asset-transactions",
    title: "GET Asset Transactions",
    showConditions: liquidNetworks,
    showCodeExamples: showCodeExamples,
    description: "Returns transactions associated with the specified Liquid asset. For the network's native asset, returns a list of peg in, peg out, and burn transactions. For user-issued assets, returns a list of issuance, reissuance, and burn transactions. Does not include regular transactions transferring this asset.",
    codeTemplates: {
      curl: {
        template: "/asset%{1}/txs"
      },
      commonjs: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const assetTxs = await assets.getAssetTxs({ asset_id, is_mempool: false }); document.getElementById(\"result\").textContent = JSON.stringify(assetTxs, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const assetTxs = await assets.getAssetTxs({ asset_id, is_mempool: false }); console.log(assetTxs);"
      }
    },
    responseSettings: {
      maxArrayLength: 1
    },
    parameters: [
      {
         label: 'asset_id',
         exampleValue: '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d',
         required: true,
         urlParam: false
      }  
    ],
    liquidtestnet: {
      parameters: [
        {
           label: 'asset_id',
           exampleValue: 'ac3e0ff248c5051ffd61e00155b7122e5ebc04fd397a0ecbdd4f4e4a56232926',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "assets",
    httpRequestMethod: "GET",
    fragment: "get-asset-supply",
    title: "GET Asset Supply",
    showConditions: liquidNetworks,
    showCodeExamples: showCodeExamples,
    description: "Get the current total supply of the specified asset. For the native asset (L-BTC), this is calculated as [chain,mempool]_stats.peg_in_amount - [chain,mempool]_stats.peg_out_amount - [chain,mempool]_stats.burned_amount. For issued assets, this is calculated as [chain,mempool]_stats.issued_amount - [chain,mempool]_stats.burned_amount. Not available for assets with blinded issuances. If /decimal is specified, returns the supply as a decimal according to the asset's divisibility. Otherwise, returned in base units.",
    codeTemplates: {
      curl: {
        template: "/asset%{1}/supply%{2}"
      },
      commonjs: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const assetSupply = await assets.getAssetSupply({ asset_id, decimal: false }); document.getElementById(\"result\").textContent = JSON.stringify(assetSupply, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { assets } } = mempoolJS(); const asset_id = '%{1}'; const assetSupply = await assets.getAssetSupply({ asset_id, decimal: false }); console.log(assetSupply);"
      }
    },
    parameters: [
      {
         label: 'asset_id',
         exampleValue: '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d',
         required: true,
         urlParam: false
      },
      {
        label: 'decimal',
        exampleValue: '',
        required: false,
        urlParam: false
      }  
    ],
    responseSettings: {
      json: false
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'asset_id',
           exampleValue: '05aa9f02a06da37f2a0a572c49ac381499a16a643ad7c70c51ac94560778c92e',
           required: true,
           urlParam: false
        },
        {
          label: 'decimal',
          exampleValue: '',
          required: false,
          urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "assets",
    httpRequestMethod: "GET",
    fragment: "get-asset-icons",
    title: "GET Asset Icons",
    showConditions: liquidNetworks,
    showCodeExamples: showCodeExamples,
    description: "Get all the Asset IDs that have icons.",
    codeTemplates: {
      curl: {
        template: "/v1/assets/icons"
      },
      commonjs: {
        template: "const { %{0}: { assets } } = mempoolJS(); const assetsIcons = await assets.getAssetsIcons(); document.getElementById(\"result\").textContent = JSON.stringify(assetsIcons, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { assets } } = mempoolJS(); const assetsIcons = await assets.getAssetsIcons(); console.log(assetsIcons);"
      }
    },
    responseSettings: {
      explicit: `[ "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d", "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2", "..." ]`
    },
    "liquidtestnet": {
      parameters: {
        labels: [],
        exampleValues: []
      },
      responseSettings: {
        explicit: ``
      },
    }
  },
  {
    type: "endpoint",
    category: "assets",
    httpRequestMethod: "GET",
    fragment: "get-asset-icon",
    title: "GET Asset Icon",
    showConditions: liquidNetworks,
    showCodeExamples: toggleCodeExampleVisibility({ "liquid": [ true, true, false, false ] }),
    description: "Get the icon of the specified asset.",
    codeTemplates: {
      curl: {
        template: "/v1/asset%{1}/icon"
      },
      commonjs: {
        template: `<img src="https://liquid.network/api/v1/asset/6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d/icon">`,
        options: { "noWrap": true }
      }
    },
    responseSettings: {
      explicit: `PNG`,
      json: false
    },
    parameters: [
      {
         label: 'asset_id',
         exampleValue: '6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: {
        label: 'asset_id',
        exampleValue: 'ac3e0ff248c5051ffd61e00155b7122e5ebc04fd397a0ecbdd4f4e4a56232926',
        required: true,
        urlParam: false
      } 
    }
  },
  {
    type: "category",
    category: "blocks",
    fragment: "blocks",
    title: "Blocks",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"])
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-nodejs",
    title: "GET Block (Node.js)",
    showConditions: bitcoinNetworks,
    showCodeExamples: toggleCodeExampleVisibility({
        "mainnet": [ true, false, false, false ],
        "testnet": [ true, false, false, false ],
        "signet": [ true, false, false, false ]
    }),
    description: "Returns details about a block using Mempool's Node.js backend.",
    codeTemplates: {
      curl: {
        template: "/v1/block%{1}"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152',
           required: true,
           urlParam: false
        }  
      ]  
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-esplora",
    title: "GET Block (Esplora)",
    showConditions: bitcoinNetworks,
    showCodeExamples: showCodeExamples,
    description: "Returns details about a block using Esplora. If you are not running Esplora, you will get a response from the other GET Block endpoint served by Mempool's Node.js backend (see above).",
    codeTemplates: {
      curl: {
        template: "/block%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const block = await blocks.getBlock({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(block, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const block = await blocks.getBlock({ hash }); console.log(block);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152',
           required: true,
           urlParam: false
        }  
      ]  
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block",
    title: "GET Block",
    showConditions: liquidNetworks.concat("bisq"),
    showCodeExamples: showCodeExamples,
    description: "Returns details about a block.",
    codeTemplates: {
      curl: {
        template: "/block%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const block = await blocks.getBlock({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(block, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const block = await blocks.getBlock({ hash }); console.log(block);"
      }
    },
    parameters: [
      {
        label: 'hash',
        exampleValue: '86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78',
        required: true,
        urlParam: false
      }   
    ],
    liquidtestnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '8f7cb70f32e2069724212c986f34462fc40180eabf189b44486faf6989824f9a',
           required: true,
           urlParam: false
        }  
      ]  
    },
    bisq: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        maxArrayLength: 1
      }
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-header",
    title: "GET Block Header",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the hex-encoded block header.",
    codeTemplates: {
      curl: {
        template: "/block%{1}/header"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockHeader = await blocks.getBlockHeader({ height: 0 }); document.getElementById(\"result\").textContent = JSON.stringify(blockHeight, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockHeader = await blocks.getBlockHeader({ height: 0 }); console.log(blockHeight);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2',
         required: true,
         urlParam: false
      }  
    ],
    responseSettings: {
      json: false
    },
    testnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '8f7cb70f32e2069724212c986f34462fc40180eabf189b44486faf6989824f9a',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-height",
    title: "GET Block Height",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the hash of the block currently at <code>:height</code>.",
    codeTemplates: {
      curl: {
        template: "/block-height%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockHeight = await blocks.getBlockHeight({ height: 0 }); document.getElementById(\"result\").textContent = JSON.stringify(blockHeight, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockHeight = await blocks.getBlockHeight({ height: 0 }); console.log(blockHeight);"
      }
    },
    parameters: [
      {
         label: 'height',
         exampleValue: '615615',
         required: true,
         urlParam: false
      }  
    ],
    responseSettings: {
      json: false
    },
    testnet: {
      parameters: [
        {
           label: 'height',
           exampleValue: '2100100',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        json: false
      },
    },
    signet: {
      parameters: [
        {
           label: 'height',
           exampleValue: '48000',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        json: false
      },
    },
    liquid: {
      parameters: [
        {
           label: 'height',
           exampleValue: '1234567',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        json: false
      },
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'height',
           exampleValue: '150000',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        json: false
      },
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-raw",
    title: "GET Block Raw",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the raw block representation in binary.",
    codeTemplates: {
      curl: {
        template: "/block%{1}/raw"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockRaw = await blocks.getBlockRaw({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(blockRaw, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockRaw = await blocks.getBlockRaw({ hash }); console.log(blockRaw);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2',
         required: true,
         urlParam: false
      }  
    ],
    responseSettings: {
      show: false
    },
    testnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        show: false
      }
    },
    signet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        show: false
      }
    },
    liquid: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78',
           required: true,
           urlParam: false
        }  
      ],
      responseSettings: {
        show: false
      }
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '67d5eb1aee63c6c2058a088985503ff0626fd3f7f8022bdc74fab36a359164db',
           required: true,
           urlParam: false
        }
      ],
      responseSettings: {
        show: false
      }
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-status",
    title: "GET Block Status",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the confirmation status of a block. Available fields: <code>in_best_chain</code> (boolean, false for orphaned blocks), <code>next_best</code> (the hash of the next block, only available for blocks in the best chain).",
    codeTemplates: {
      curl: {
        template: "/block%{1}/status"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockStatus = await blocks.getBlockStatus({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(blockStatus, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockStatus = await blocks.getBlockStatus({ hash }); console.log(blockStatus);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2',
         required: true,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'hash',
           exampleValue: '67d5eb1aee63c6c2058a088985503ff0626fd3f7f8022bdc74fab36a359164db',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-tip-height",
    title: "GET Block Tip Height",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    description: "Returns the height of the last block.",
    codeTemplates: {
      curl: {
        template: "/blocks/tip/height"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const blocksTipHeight = await blocks.getBlocksTipHeight(); document.getElementById(\"result\").textContent = JSON.stringify(blocksTipHeight, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const blocksTipHeight = await blocks.getBlocksTipHeight(); console.log(blocksTipHeight);"
      }
    },
    responseSettings: {
      json: false
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-tip-hash",
    title: "GET Block Tip Hash",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the hash of the last block.",
    codeTemplates: {
      curl: {
        template: "/blocks/tip/hash"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const blocksTipHash = await blocks.getBlocksTipHash(); document.getElementById(\"result\").textContent = JSON.stringify(blocksTipHash, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const blocksTipHash = await blocks.getBlocksTipHash(); console.log(blocksTipHash);"
      }
    },
    responseSettings: {
      json: false
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-transaction-id",
    title: "GET Block Transaction ID",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the transaction at the <code>:index</code> within the specified block.",
    codeTemplates: {
      curl: {
        template: "/block%{1}/txid%{2}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxid = await blocks.getBlockTxid({ hash, index: %{2} }); document.getElementById(\"result\").textContent = JSON.stringify(blockTxid, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxid = await blocks.getBlockTxid({ hash, index: %{2} }); console.log(blockTxid);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce',
         required: true,
         urlParam: false
      },
      {
        label: 'index',
        exampleValue: '218',
        required: true,
        urlParam: false
      }    
    ],
    responseSettings: {
      json: false
    },
    testnet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: '000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b',
          required: true,
          urlParam: false
          },
          {
          label: 'index',
          exampleValue: '1',
          required: true,
          urlParam: false
        }   
      ]  
    },
    signet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: '0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f',
          required: true,
          urlParam: false
          },
          {
          label: 'index',
          exampleValue: '1',
          required: true,
          urlParam: false
        }
      ]  
    },
    liquid: {
      parameters: [
        {
          label: 'hash',
          exampleValue: 'dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13',
          required: true,
          urlParam: false
          },
          {
          label: 'index',
          exampleValue: '1',
          required: true,
          urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: 'b6b4aeefa220c6a17da116bda666e869b3146967d2479656448a8bce1e799b8f',
          required: true,
          urlParam: false
          },
          {
          label: 'index',
          exampleValue: '1',
          required: true,
          urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-transaction-ids",
    title: "GET Block Transaction IDs",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns the TXIDs of all transactions in the block with the specified <code>:hash</code>.",
    codeTemplates: {
      curl: {
        template: "/block%{1}/txids"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxids = await blocks.getBlockTxids({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(blockTxids, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxids = await blocks.getBlockTxids({ hash }); console.log(blockTxids);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce',
         required: true,
         urlParam: false
      }  
    ],
    responseSettings: {
      maxArrayLength: 5
    },
    testnet: {
      parameters: [
        {
           label: '',
           exampleValue: '000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b',
           required: true,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
           label: '',
           exampleValue: '0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: '',
           exampleValue: 'dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: '',
           exampleValue: 'b6b4aeefa220c6a17da116bda666e869b3146967d2479656448a8bce1e799b8f',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-block-transactions",
    title: "GET Block Transactions",
    showConditions: bitcoinNetworks.concat(liquidNetworks),
    showCodeExamples: showCodeExamples,
    description: "Returns a list of transactions in the block (up to 25 transactions beginning at <code>:startIndex</code>). Transactions do not have the <code>status</code> field since they are all confirmed.",
    codeTemplates: {
      curl: {
        template: "/block%{1}/txs%{2}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxs = await blocks.getBlockTxs({ hash }); document.getElementById(\"result\").textContent = JSON.stringify(blockTxs, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const hash = '%{1}'; const blockTxs = await blocks.getBlockTxs({ hash }); console.log(blockTxs);"
      }
    },
    parameters: [
      {
         label: 'hash',
         exampleValue: '000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce',
         required: true,
         urlParam: false
      },
      {
        label: 'startIndex',
        exampleValue: '',
        required: false,
        urlParam: false
      }  
    ],
    responseSettings: {
      maxArrayLength: 1
    },
    testnet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: '000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b',
          required: true,
          urlParam: false
        },
        {
          label: 'startIndex',
          exampleValue: '',
          required: false,
          urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: '000000e29b097a544c013257a2938c57e0f713305fd01ff13a99b28bb8f44d5b',
          required: true,
          urlParam: false
        },
        {
          label: 'startIndex',
          exampleValue: '',
          required: false,
          urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
          label: 'hash',
          exampleValue: 'dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13',
          required: true,
          urlParam: false
        },
        {
          label: 'startIndex',
          exampleValue: '',
          required: false,
          urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
          label: 'hash',
          exampleValue: 'b6b4aeefa220c6a17da116bda666e869b3146967d2479656448a8bce1e799b8f',
          required: true,
          urlParam: false
        },
        {
          label: 'startIndex',
          exampleValue: '',
          required: false,
          urlParam: false
        }  
      ]  
    },
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks-nodejs",
    title: "GET Blocks (Node.js)",
    showConditions: bitcoinNetworks,
    showCodeExamples: showCodeExamples,
    description: "<p>Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field using Mempool's Node.js backend.</p><p>If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.</p>",
    codeTemplates: {
      curl: {
        template: "/v1/blocks%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);"
      }
    },
    parameters: [
      {
         label: 'startHeight',
         exampleValue: '730000',
         required: false,
         urlParam: false
      }  
    ],
    responseSettings: {
      maxArrayLength: 1
    },
    testnet: {
      parameters: [
        {
           label: 'startHeight',
           exampleValue: '2091187',
           required: false,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
          label: 'startHeight',
          exampleValue: '53783',
          required: false,
          urlParam: false
        }
      ]
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks-esplora",
    title: "GET Blocks (Esplora)",
    showConditions: bitcoinNetworks,
    showCodeExamples: showCodeExamples,
    description: "<p>Returns details on the past 15 blocks using Esplora. If you are not running Esplora, you will get a response from the other GET Blocks endpoint served by Mempool's Node.js backend (see above).</p><p>If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.</p>",
    codeTemplates: {
      curl: {
        template: "/blocks%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);"
      }
    },
    parameters: [
      {
         label: 'startHeight',
         exampleValue: '730000',
         required: false,
         urlParam: false
      }  
    ],
    responseSettings: {
      maxArrayLength: 2
    },
    testnet: {
      parameters: [
        {
           label: 'startHeight',
           exampleValue: '2091187',
           required: false,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
          label: 'startHeight',
          exampleValue: '53783',
          required: false,
          urlParam: false
        }
      ]
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks",
    title: "GET Blocks",
    showConditions: liquidNetworks.concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    description: "<p>Returns details on the past 10 blocks. If <code>:startHeight</code> is specified, the past 10 blocks before (and including) <code>:startHeight</code> are returned.</p>",
    codeTemplates: {
      curl: {
        template: "/blocks%{1}"
      },
      commonjs: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);"
      },
      esmodule: {
        template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);"
      }
    },
    parameters: [
      {
         label: 'startHeight',
         exampleValue: '1472246',
         required: false,
         urlParam: false
      }  
    ],
    responseSettings: {
      maxArrayLength: 2
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'startHeight',
           exampleValue: '150000',
           required: false,
           urlParam: false
        }  
      ]  
    },
    bisq: {
      description: "<p>Returns the past <code>n</code> blocks with BSQ transactions starting <code>m</code> blocks ago.</p><p>Assume a block height of 700,000. Query <code>/blocks/0/10</code> for the past 10 blocks before 700,000 with BSQ transactions. Query <code>/blocks/1000/10</code> for the past 10 blocks before 699,000 with BSQ transactions.</p>",
      codeTemplates: {
        curl: {
          template: "/blocks%{1}%{2}"
        },
        commonjs: {
          template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);"
        },
        esmodule: {
          template: "const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);"
        }
      },
      parameters: [
        {
           label: 'm',
           exampleValue: '0',
           required: true,
           urlParam: false
        },
        {
          label: 'n',
          exampleValue: '5',
          required: true,
          urlParam: false
        }  
      ]
    }
  },
  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks-bulk",
    title: "GET Blocks (Bulk)",
    showConditions: bitcoinNetworks,
    showCodeExamples: toggleCodeExampleVisibility({ "mainnet": [ true, false, false, false ], "testnet": [ true, false, false, false ], "signet": [ true, false, false, false ] }),
    description: "<p><p>Returns details on the range of blocks between <code>:minHeight</code> and <code>:maxHeight</code>, inclusive, up to 10 blocks. If <code>:maxHeight</code> is not specified, it defaults to the current tip.</p><p>To return data for more than 10 blocks, consider becoming an <a href='/enterprise'>enterprise sponsor</a>.</p>",
    codeTemplates: {
      curl: {
        template: "/v1/blocks-bulk%{1}%{2}"
      }
    },
    parameters: [
      {
         label: 'minHeight',
         exampleValue: '100000',
         required: true,
         urlParam: false
      },
      {
         label: 'maxHeight',
         exampleValue: '100000',
         required: true,
         urlParam: false
      }  
    ],
    responseSettings: {
      explicit: `[ { "height": 100000, "hash": "000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506", "timestamp": 1293623863, "median_timestamp": 1293622620, "previous_block_hash": "000000000002d01c1fccc21636b607dfd930d31d01c3a62104612a1719011250", "difficulty": 14484.1623612254, "header": "0100000050120119172a610421a6c3011dd330d9df07b63616c2cc1f1cd00200000000006657a9252aacd5c0b2940996ecff952228c3067cc38d4885efb5a4ac4247e9f337221b4d4c86041b0f2b5710", "version": 1, "bits": 453281356, "nonce": 274148111, "size": 957, "weight": 3828, "tx_count": 4, "merkle_root": "f3e94742aca4b5ef85488dc37c06c3282295ffec960994b2c0d5ac2a25a95766", "reward": 5000000000, "total_fee_amt": 0, "avg_fee_amt": 0, "median_fee_amt": 0, "fee_amt_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "avg_fee_rate": 0, "median_fee_rate": 0, "fee_rate_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "total_inputs": 3, "total_input_amt": 5301000000, "total_outputs": 6, "total_output_amt": 5301000000, "segwit_total_txs": 0, "segwit_total_size": 0, "segwit_total_weight": 0, "avg_tx_size": 185.25, "utxoset_change": 3, "utxoset_size": 71888, "coinbase_raw": "044c86041b020602", "coinbase_address": null, "coinbase_signature": "OP_PUSHBYTES_65 041b0e8c2567c12536aa13357b79a073dc4444acb83c4ec7a0e2f99dd7457516c5817242da796924ca4e99947d087fedf9ce467cb9f7c6287078f801df276fdf84 OP_CHECKSIG", "coinbase_signature_ascii": "u+0004Lu+0086u+0004u+001bu+0002u+0006u+0002", "pool_slug": "unknown", "orphans": [] } ]`
    },
    testnet: {
      responseSettings: {
        explicit: `[ { "height": 100000, "hash": "00000000009e2958c15ff9290d571bf9459e93b19765c6801ddeccadbb160a1e", "timestamp": 1376123972, "median_timestamp": 1677396660, "previous_block_hash": "000000004956cc2edd1a8caa05eacfa3c69f4c490bfc9ace820257834115ab35", "difficulty": 271.7576739288896, "header": "0200000035ab154183570282ce9afc0b494c9fc6a3cfea05aa8c1add2ecc56490000000038ba3d78e4500a5a7570dbe61960398add4410d278b21cd9708e6d9743f374d544fc055227f1001c29c1ea3b", "version": 2, "bits": 469823783, "nonce": 1005240617, "size": 221, "weight": 884, "tx_count": 1, "merkle_root": "d574f343976d8e70d91cb278d21044dd8a396019e6db70755a0a50e4783dba38", "reward": 5000000000, "total_fee_amt": 0, "avg_fee_amt": 0, "median_fee_amt": 0, "fee_amt_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "avg_fee_rate": 0, "median_fee_rate": 0, "fee_rate_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "total_inputs": 0, "total_input_amt": null, "total_outputs": 1, "total_output_amt": 0, "segwit_total_txs": 0, "segwit_total_size": 0, "segwit_total_weight": 0, "avg_tx_size": 0, "utxoset_change": 1, "utxoset_size": null, "coinbase_raw": "03a08601000427f1001c046a510100522cfabe6d6d0000000000000000000068692066726f6d20706f6f6c7365727665726aac1eeeed88", "coinbase_address": "mtkbaiLiUH3fvGJeSzuN3kUgmJzqinLejJ", "coinbase_signature": "OP_DUP OP_HASH160 OP_PUSHBYTES_20 912e2b234f941f30b18afbb4fa46171214bf66c8 OP_EQUALVERIFY OP_CHECKSIG", "coinbase_signature_ascii": "u+0003 �u+0001u+0000u+0004'ñu+0000u+001cu+0004jQu+0001u+0000R,ú¾mmu+0000u+0000u+0000u+0000u+0000u+0000u+0000u+0000u+0000u+0000hi from poolserverj¬u+001eîí�", "pool_slug": "unknown", "orphans": [] } ]`
      }
    },
    signet: {
      responseSettings: {
        explicit: `[ { "height": 100000, "hash": "0000008753108390007b3f5c26e5d924191567e147876b84489b0c0cf133a0bf", "timestamp": 1658421183, "median_timestamp": 1658418056, "previous_block_hash": "000000b962a13c3dd3f81917bc8646a0c98224adcd5124026d4fdfcb76a76d30", "difficulty": 0.002781447610743506, "header": "00000020306da776cbdf4f6d022451cdad2482c9a04686bc1719f8d33d3ca162b90000001367fb15320ebb1932fd589f8f38866b692ca8a4ad6100a4bc732d212916d0efbf7fd9628567011e47662d00", "version": 536870912, "bits": 503408517, "nonce": 2975303, "size": 343, "weight": 1264, "tx_count": 1, "merkle_root": "efd01629212d73bca40061ada4a82c696b86388f9f58fd3219bb0e3215fb6713", "reward": 5000000000, "total_fee_amt": 0, "avg_fee_amt": 0, "median_fee_amt": 0, "fee_amt_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "avg_fee_rate": 0, "median_fee_rate": 0, "fee_rate_percentiles": { "min": 0, "perc_10": 0, "perc_25": 0, "perc_50": 0, "perc_75": 0, "perc_90": 0, "max": 0 }, "total_inputs": 0, "total_input_amt": null, "total_outputs": 2, "total_output_amt": 0, "segwit_total_txs": 0, "segwit_total_size": 0, "segwit_total_weight": 0, "avg_tx_size": 0, "utxoset_change": 2, "utxoset_size": null, "coinbase_raw": "03a08601", "coinbase_address": "tb1psfjl80vk0yp3agcq6ylueas29rau00mfq90mhejerpgccg33xhasd9gjyd", "coinbase_signature": "OP_PUSHNUM_1 OP_PUSHBYTES_32 8265f3bd9679031ea300d13fccf60a28fbc7bf69015fbbe65918518c223135fb", "coinbase_signature_ascii": "u+0003 �u+0001", "pool_slug": "unknown", "orphans": [] } ]`
      }
    }
  },
  {
    type: "category",
    category: "mining",
    fragment: "mining",
    title: "Mining",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "mining",
    httpRequestMethod: "GET",
    fragment: "get-mining-pools",
    title: "GET Mining Pools",
    showConditions: bitcoinNetworks,
    showCodeExamples: toggleCodeExampleVisibility({ "mainnet": [ true, false, false, false ], "testnet": [ true, false, false, false ], "signet": [ true, false, false, false ] }),
    description: "Returns a list of all known mining pools ordered by blocks found over the specified trailing <code>:timePeriod</code>.</p><p>Leave <code>:timePeriod</code> unspecified to get all available data, or specify one of the following values: " + miningTimeIntervals + ".",
    codeTemplates: {
      curl: {
        template: "/v1/mining/pools%{1}"
      }
    },
    parameters: [
      {
         label: 'timePeriod',
         exampleValue: '1w',
         required: false,
         urlParam: false
      }  
    ],
    testnet: {
      parameters: [
        {
           label: 'timePeriod',
           exampleValue: '3y',
           required: false,
           urlParam: false
        }  
      ]  
    },
    signet: {
      parameters: [
        {
          label: 'timePeriod',
          exampleValue: '3y',
          required: false,
          urlParam: false
        }
      ]
    }
  },


  


];

export const faqData = [
  {
    type: "category",
    category: "basics",
    fragment: "basics",
    title: "Basics",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-a-mempool",
    title: "What is a mempool?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-a-mempool-explorer",
    title: "What is a mempool explorer?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-a-blockchain",
    title: "What is a blockchain?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-a-block-explorer",
    title: "What is a block explorer?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-mining",
    title: "What is mining?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-are-mining-pools",
    title: "What are mining pools?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-are-vb-wu",
    title: "What are virtual bytes (vB) and weight units (WU)?",
  },
  {
    type: "endpoint",
    category: "basics",
    showConditions: bitcoinNetworks,
    fragment: "what-is-svb",
    title: "What is sat/vB?",
  },
  {
    type: "category",
    category: "help",
    fragment: "help-stuck-transaction",
    title: "Help! My transaction is stuck",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "help",
    showConditions: bitcoinNetworks,
    fragment: "why-is-transaction-stuck-in-mempool",
    title: "Why isn't my transaction confirming?",
  },
  {
    type: "endpoint",
    category: "help",
    showConditions: bitcoinNetworks,
    fragment: "how-to-get-transaction-confirmed-quickly",
    title: "How can I get my transaction confirmed more quickly?",
  },
  {
    type: "endpoint",
    category: "help",
    showConditions: bitcoinNetworks,
    fragment: "how-prevent-stuck-transaction",
    title: "How can I prevent a transaction from getting stuck in the future?",
  },
  {
    type: "category",
    category: "using",
    fragment: "using-this-website",
    title: "Using this website",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "how-to",
    showConditions: bitcoinNetworks,
    fragment: "looking-up-transactions",
    title: "How can I look up a transaction?",
  },
  {
    type: "endpoint",
    category: "how-to",
    showConditions: bitcoinNetworks,
    fragment: "looking-up-addresses",
    title: "How can I look up an address?",
  },
  {
    type: "endpoint",
    category: "how-to",
    showConditions: bitcoinNetworks,
    fragment: "looking-up-blocks",
    title: "How can I look up a block?",
  },
  {
    type: "endpoint",
    category: "how-to",
    showConditions: bitcoinNetworks,
    fragment: "looking-up-fee-estimates",
    title: "How can I look up fee estimates?",
  },
  {
    type: "endpoint",
    category: "how-to",
    showConditions: bitcoinNetworks,
    fragment: "looking-up-historical-trends",
    title: "How can I explore historical trends?",
  },
  {
    type: "category",
    category: "advanced",
    fragment: "advanced",
    title: "Advanced",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "advanced",
    showConditions: bitcoinNetworks,
    fragment: "what-is-full-mempool",
    title: "What does it mean for the mempool to be \"full\"?",
  },
  {
    type: "endpoint",
    category: "advanced",
    showConditions: bitcoinNetworks,
    fragment: "why-empty-blocks",
    title: "Why are there empty blocks?",
  },
  {
    type: "endpoint",
    category: "advanced",
    showConditions: bitcoinNetworks,
    fragment: "why-block-timestamps-dont-always-increase",
    title: "Why don't block timestamps always increase?",
  },
  {
    type: "endpoint",
    category: "advanced",
    showConditions: bitcoinNetworks,
    fragment: "why-dont-fee-ranges-match",
    title: "Why doesn't the fee range shown for a block match the feerates of transactions within the block?",
  },
  {
    type: "category",
    category: "self-hosting",
    fragment: "self-hosting",
    title: "Self-Hosting",
    showConditions: bitcoinNetworks
  },
  {
    type: "endpoint",
    category: "self-hosting",
    showConditions: bitcoinNetworks,
    fragment: "who-runs-this-website",
    title: "Who runs this website?",
  },
  {
    type: "endpoint",
    category: "self-hosting",
    showConditions: bitcoinNetworks,
    fragment: "host-my-own-instance-raspberry-pi",
    title: "How can I host my own instance on a Raspberry Pi?",
  },
  {
    type: "endpoint",
    category: "self-hosting",
    showConditions: bitcoinNetworks,
    fragment: "host-my-own-instance-linux-server",
    title: "How can I host my own instance on a Linux server?",
  },
  {
    type: "endpoint",
    category: "self-hosting",
    showConditions: bitcoinNetworks,
    fragment: "install-mempool-with-docker",
    title: "Can I install Mempool using Docker?",
  },
  {
    type: "endpoint",
    category: "self-hosting",
    showConditions: bitcoinNetworks,
    fragment: "address-lookup-issues",
    title: "Why do I get an error for certain address lookups on my Mempool instance?",
  }
];
