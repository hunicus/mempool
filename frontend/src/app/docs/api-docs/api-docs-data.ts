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
      options: {
        json: false
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
    fragment: "get-block",
    title: "GET Block",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    description: "Returns details about a block.",
    codeTemplates: {
      curl: {
        template: "/v1/block%{1}"
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
    },
    liquid: {
      codeTemplates: {
          curl: {
              template: "/block%{1}"
          }
      },
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
      codeTemplates: {
        curl: {
          template: "/block%{1}"
        }
      },
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
      codeTemplates: {
        curl: {
          template: "/block%{1}"
        }
      },
      parameters: [
        {
           label: 'hash',
           exampleValue: '0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5',
           required: true,
           urlParam: false
        }  
      ]  
    }
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
