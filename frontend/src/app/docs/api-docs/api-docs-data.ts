const bitcoinNetworks = ["", "testnet", "signet"];
const liquidNetworks = ["liquid", "liquidtestnet"];
const miningTimeIntervals = "<code>24h</code>, <code>3d</code>, <code>1w</code>, <code>1m</code>, <code>3m</code>, <code>6m</code>, <code>1y</code>, <code>2y</code>, <code>3y</code>";

const showCodeExamples = { 
  //"network": [curl, commonjs, esmodule, python]
  "mainnet": [ true, true, true, false ],
  "testnet": [ true, true, true, false ],
  "signet": [ true, true, true, false ],
  "bisq": [ true, true, true, false ],
  "liquid": [ true, true, true, false ],
  "liquidtestnet": [ true, false, false, false ],
};

function toggleCodeExampleVisibility( changes ) {
  let newShowCodeExamples = showCodeExamples;
  for( let c of changes ) {
    newShowCodeExamples[ c[0] ] = c[1];
  }
  return newShowCodeExamples;
}

/*export const wsApiDocsData = {
  showCodeExamples: showCodeExamples,
  codeTemplate: {
    curl: `/api/v1/ws`,
    commonJS: `
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
    esModule: `
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
  codeSampleBisq: emptyCodeSample,
};*/

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
    default: {
      description: "Returns details about difficulty adjustment.",
      codeTemplates: {
        curl: "/v1/difficulty-adjustment",
        commonJS: {
          text: `
        const { %{0}: { difficulty } } = mempoolJS();

        const difficultyAdjustment = await difficulty.getDifficultyAdjustment();

        document.getElementById("result").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);
          `,
          options: {}
        },
        esModule: {
          text: `
  const { %{0}: { difficulty } } = mempoolJS();

  const difficultyAdjustment = await difficulty.getDifficultyAdjustment();
  console.log(difficultyAdjustment);
          `,
          options: {}
        },
        python: {}
      },
      parameters: [],
      response: `{
  "progressPercent": 53.323412698412696,
  "difficultyChange": -10.371478953972623,
  "estimatedRetargetDate": 1670335628689,
  "remainingBlocks": 941,
  "remainingTime": 629932689,
  "previousRetarget": 0.5121980044909791,
  "nextRetargetHeight": 766080,
  "timeAvg": 669429,
  "timeOffset": 0
}`
    },
    testnet: {
      parameters: [],
      response: `{
  "progressPercent": 90.37698412698413,
  "difficultyChange": 27.06899758229495,
  "estimatedRetargetDate": 1669797301696,
  "remainingBlocks": 194,
  "remainingTime": 91603696,
  "previousRetarget": 11.976267373336526,
  "nextRetargetHeight": 2409120,
  "timeAvg": 472184,
  "timeOffset": 0
}`,
    },
    signet: {
      parameters: [],
      response: `{
  "progressPercent": 2.7777777777777777,
  "difficultyChange": 0,
  "estimatedRetargetDate": 1670882013000,
  "remainingBlocks": 1960,
  "remainingTime": 1176000000,
  "previousRetarget": 1.3905994045412642,
  "nextRetargetHeight": 120960,
  "timeAvg": 600000,
  "timeOffset": 0
}`
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
    bisq: {
      description: "Returns statistics about all Bisq transactions.",
      codeTemplates: {
        curl: "/stats",
        commonJS: { 
          text: `
        const { %{0}: { statistics } } = mempoolJS();

        const stats = await statistics.getStats();

        document.getElementById("result").textContent = JSON.stringify(stats, undefined, 2);
          `,
          options: {}
        },
        esModule: {
          text: `
  const { %{0}: { statistics } } = mempoolJS();

  const stats = await statistics.getStats();
  console.log(stats);
          `,
          options: {}
        }
      },
      parameters: [],
      response: `{
        addresses: 213825,
        minted: 6148323.75,
        burnt: 1830262.66,
        spent_txos: 215705,
        unspent_txos: 2572
      }`
    }
  }
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
