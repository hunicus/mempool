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
    description: "Provides list of open offer prices for a single market.",
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
    description: "Provides hi/low/open/close data for a given market. This can be used to generate a candlestick chart.",
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
    description: "Provides list of open offer details for a single market.",
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
    description: "Provides 24-hour price ticker. Pass a <code>market</code> parameter for ticker on a single market, or pass no parameter for tickers on all markets.",
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
    description: "Provides list of completed trades for a single market. Specify the number of trades to return with <code>limit</code>, otherwise, the last 100 trades are returned.",
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
    description: "Returns details about an address.",
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
    parameters: [
      {
         label: 'address',
         exampleValue: 'bc1qnhldqku6hsne8snapptklmsv66cjumkw4eezpa8awrwzpjv4n3aqj4jj4n',
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
           exampleValue: '',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquid: {
      parameters: [
        {
           label: 'address',
           exampleValue: '',
           required: true,
           urlParam: false
        }  
      ]  
    },
    liquidtestnet: {
      parameters: [
        {
           label: 'address',
           exampleValue: '',
           required: true,
           urlParam: false
        }  
      ]  
    },
  },


  
  // {
  //   type: "endpoint",
  //   category: "blocks",
  //   httpRequestMethod: "GET",
  //   fragment: "get-blocks",
  //   title: "GET Blocks",
  //   showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
  //   showCodeExamples: showCodeExamples,
  //   description: "Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.",
  //   codeTemplates: {
  //     curl: {
  //       template: `/v1/blocks%{1}`
  //     },
  //     commonjs: {
  //       template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
  //     },
  //     esmodule: {
  //       template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);`
  //     }
  //   },
  //   parameters: [
  //     {
  //       label: 'startHeight',
  //       exampleValue: '730000',
  //       required: false,
  //       urlParam: false
  //     }
  //   ],
  //   responseSettings: {
  //     maxArrayLength: 1
  //   },
  //   testnet: {
  //     parameters: [
  //       {
  //         label: 'startHeight',
  //         exampleValue: '2091187',
  //         required: false,
  //         urlParam: false
  //       }
  //     ]
  //   },
  //   signet: {
  //     parameters: [
  //       {
  //         label: 'startHeight',
  //         exampleValue: '53783',
  //         required: false,
  //         urlParam: false
  //       }
  //     ]
  //   },
  //   liquid: {
  //     description: "Returns details on the past 10 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 10 blocks before (and including) <code>:startHeight</code> are returned.",
  //     codeTemplates: {
  //       curl: {
  //         template: `/blocks%{1}`
  //       },
  //     },
  //     parameters: [
  //       {
  //         label: 'startHeight',
  //         exampleValue: '1472246',
  //         required: false,
  //         urlParam: false
  //       }
  //     ]
  //   },
  //   liquidtestnet: {
  //     description: "Returns details on the past 10 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 10 blocks before (and including) <code>:startHeight</code> are returned.",
  //     codeTemplates: {
  //       curl: {
  //         template: `/blocks%{1}`
  //       },
  //     },
  //     parameters: [
  //       {
  //         label: 'startHeight',
  //         exampleValue: '150000',
  //         required: false,
  //         urlParam: false
  //       }
  //     ]
  //   },
  //   bisq: {
  //     description: "<p>Returns the past <code>n</code> blocks with BSQ transactions starting <code>m</code> blocks ago.</p><p>Assume a block height of 700,000. Query <code>/blocks/0/10</code> for the past 10 blocks before 700,000 with BSQ transactions. Query <code>/blocks/1000/10</code> for the past 10 blocks before 699,000 with BSQ transactions.",
  //     codeTemplates: {
  //       curl: {
  //         template: `/blocks%{1}%{2}`
  //       },
  //       commonjs: {
  //         template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
  //       },
  //       esmodule: {
  //         template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); console.log(getBlocks);`
  //       }
  //     },
  //     parameters: [
  //       {
  //         label: 'm',
  //         exampleValue: 0,
  //         required: true,
  //         urlParam: false
  //       },
  //       {
  //         label: 'n',
  //         exampleValue: 5,
  //         required: true,
  //         urlParam: false
  //       }
  //     ]
  //   }
  // }


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
