/**********************************************************************************************************************************

  EXAMPLE OF HOW A REST API DOC OBJECT WORKS

  {
    //GENERAL INFO
    //the following properties must be specified for every rest endpoint ----------->

    type: "endpoint",               //string, must be either 'endpoint' or 'category'
    category: "blocks",             
    httpRequestMethod: "GET",       
    fragment: "get-blocks",         //string, for anchor links
    title: "GET Blocks",            
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),    //array that determines which network docs pages show the endpoint
    showCodeExamples: showCodeExamples,     //an object that determines which code examples are shown on each network; can be modified using toggleCodeExampleVisibility() for convenience

    //PROPERTIES FOR ALL NETWORKS
    //the following properties apply to ALL networks unless overridden in network-specific objects (see signet and bisq objects below for examples) ----------->

    description: "Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.",

    //PROPERTIES FOR ALL NETWORKS - CODE TEMPLATES
    //the following code templates are applied for ALL networks unless overridden in network-specific properties.

    codeTemplates: {
      curl: {
        template: `/v1/blocks/%{1}`
      },
      commonjs: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
      },
      esmodule: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);`
      }
    },

    //PROPERTIES FOR ALL NETWORKS - PARAMETERS
    //the following parameters are applied for ALL networks unless overridden in network-specific properties.

    parameters: {
      labels: ['[/:startHeight]'],
      exampleValues: [730000]
    },

    //PROPERTIES FOR ALL NETWORKS - RESPONSE FETCHING SETTINGS
    //setting `explicit` disables response fetching and uses the provided text as a response.
    //if `freeze` is true, existing response from `api-docs-code.ts` will be used, and no http request will be made for a new response.
    //if `freeze` is false, an http request will be made for a response.
    //it is possible to set this per network...see signet property below for example.
    //see init.sh for further details, including using `force-reset-all` to sanity-check all non-explicit endpoints for changes in response structure, etc.

    responseSettings: {
      freeze: true,
      explicit: ''
    },

    //PROPERTIES FOR SIGNET ONLY (EXAMPLE)
    //the following properties override corresponding properties from above when signet is the network
    //a parameters override, if provided, must specify BOTH labels AND corresponding exampleValues.,,the entire parameters object is overridden, so specifying just exampleValues will NOT work.
    //the following responseSettings override results in ONLY signet response being fetched (for other networks, `freeze` is true, as specified above).

    signet: {
      parameters: {
        labels: ['[/:startHeight]'],
        exampleValues: [53783]
      },
      responseSettings: {
        freeze: false,
        explicit: '{ "btc": "hodl" }' //specify a response to use in place of fetching one from the server; this property is optional.
      },
    },

    //PROPERTIES FOR BISQ ONLY (EXAMPLE)
    //the following properties override corresponding properties from above when bisq is the network
    //take note of the options property for commonjs...it is meant to specify optional options for special treatment; for example, noWrap does not wrap template with boilerplate javascript code (needed for liquid's `/api/v1/asset/:asset_id/icon` endpoint)
    //other options can be specified and implemented as needed.

    bisq: {
      description: "<p>Returns the past <code>n</code> blocks with BSQ transactions starting <code>m</code> blocks ago.</p><p>Assume a block height of 700,000. Query <code>/blocks/0/10</code> for the past 10 blocks before 700,000 with BSQ transactions. Query <code>/blocks/1000/10</code> for the past 10 blocks before 699,000 with BSQ transactions.",
      codeTemplates: {
        curl: {
          template: `/blocks/%{1}/%{2}`
        },
        commonjs: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
          options: { "noWrap": true }
        },,
        esmodule: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); console.log(getBlocks);`
        }
      },
      parameters: {
        labels: ['/:m', '/:n'],
        exampleValues: [0,5]
      }
    }

  }
  
**********************************************************************************************************************************/

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
    },
    responseSettings: {
      freeze: true
    }
  },
  {
    type: "endpoint",
    category: "general",
    httpRequestMethod: "GET",
    fragment: "get-stats",
    title: "GET Stats",
    showConditions: ["bisq"],
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
    },
    responseSettings: {
      freeze: true
    } 
  },
  {
    type: "category",
    category: "markets",
    fragment: "markets",
    title: "Markets",
    showConditions: ["bisq"]
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
      freeze: true,
      explicit: `{ "BTC": { "code": "BTC", "name": "Bitcoin", "precision": 8, "_type": "crypto" }, "USD": { "code": "USD", "name": "US Dollar", "precision": 8, "_type": "fiat" }, "...": "..." }`
    }
  }/*,





  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks",
    title: "GET Blocks",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    description: "Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.",
    codeTemplates: {
      curl: {
        template: `/v1/blocks/%{1}`
      },
      commonjs: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
      },
      esmodule: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);`
      }
    },
    parameters: {
      labels: ['[/:startHeight]'],
      exampleValues: [730000]
    },
    responseSettings: {
      freeze: true,
      explicit: ''
    },
    testnet: {
      parameters: {
        labels: ['[/:startHeight]'],
        exampleValues: [2091187]
      }
    },
    signet: {
      parameters: {
        labels: ['[/:startHeight]'],
        exampleValues: [53783]
      }
    },
    liquid: {
      description: "Returns details on the past 10 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 10 blocks before (and including) <code>:startHeight</code> are returned.",
      codeTemplates: {
        curl: {
          template: `/blocks/%{1}`
        },
      },
      parameters: {
        labels: ['[/:startHeight]'],
        exampleValues: [1472246]
      }
    },
    liquidtestnet: {
      description: "Returns details on the past 10 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 10 blocks before (and including) <code>:startHeight</code> are returned.",
      codeTemplates: {
        curl: {
          template: `/blocks/%{1}`
        },
      },
      parameters: {
        labels: ['[/:startHeight]'],
        exampleValues: [150000]
      }
    },
    bisq: {
      description: "<p>Returns the past <code>n</code> blocks with BSQ transactions starting <code>m</code> blocks ago.</p><p>Assume a block height of 700,000. Query <code>/blocks/0/10</code> for the past 10 blocks before 700,000 with BSQ transactions. Query <code>/blocks/1000/10</code> for the past 10 blocks before 699,000 with BSQ transactions.",
      codeTemplates: {
        curl: {
          template: `/blocks/%{1}/%{2}`
        },
        commonjs: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
        },
        esmodule: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); console.log(getBlocks);`
        }
      },
      parameters: {
        labels: ['/:m', '/:n'],
        exampleValues: [0,5]
      }
    }
  }*/


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
