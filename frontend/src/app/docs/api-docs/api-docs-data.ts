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
  "liquidtestnet": [ true, false, false, false ],
};

function toggleCodeExampleVisibility( changes ) {
  let newShowCodeExamples = showCodeExamples;
  for( let c of changes ) {
    newShowCodeExamples[ c[0] ] = c[1];
  }
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
    //overridable -->
    description: "Returns details about difficulty adjustment.",
    codeTemplates: {
      curl: {
        template: `/v1/difficulty-adjustment`,
        options: {}
      },
      commonjs: {
        template: `
      const { %{0}: { difficulty } } = mempoolJS();

      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();

      document.getElementById("result").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);
        `,
        options: {}
      },
      esmodule: {
        template: `
const { %{0}: { difficulty } } = mempoolJS();

const difficultyAdjustment = await difficulty.getDifficultyAdjustment();
console.log(difficultyAdjustment);
        `,
        options: {}
      },
      python: {}
    },
    parameters: {
      labels: [],
      exampleValues: []
    },
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
}`,
    testnet: {
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
    //overridable -->
    description: "Returns statistics about all Bisq transactions.",
    codeTemplates: {
      curl: {
        template: `/stats`,
        options: {}
      },
      commonjs: { 
        template: `
      const { %{0}: { statistics } } = mempoolJS();

      const stats = await statistics.getStats();

      document.getElementById("result").textContent = JSON.stringify(stats, undefined, 2);
        `,
        options: {}
      },
      esmodule: {
        template: `
const { %{0}: { statistics } } = mempoolJS();

const stats = await statistics.getStats();
console.log(stats);
        `,
        options: {}
      }
    },
    parameters: {
      labels: [],
      exampleValues: []
    },
    response: `{
addresses: 213825,
minted: 6148323.75,
burnt: 1830262.66,
spent_txos: 215705,
unspent_txos: 2572
}`
  },





  {
    type: "endpoint",
    category: "blocks",
    httpRequestMethod: "GET",
    fragment: "get-blocks",
    title: "GET Blocks",
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),
    showCodeExamples: showCodeExamples,
    //overridable -->
    description: "Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.",
    codeTemplates: {
      curl: {
        template: `/v1/blocks/%{1}`,
        options: {}
      },
      commonjs: {
        template: `
      const { %{0}: { blocks } } = mempoolJS();
      const getBlocks = await blocks.getBlocks({ startHeight: %{1} });

      document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);
        `,
        options: {}
      },
      esmodule: {
        template: `
const { %{0}: { blocks } } = mempoolJS();
const getBlocks = await blocks.getBlocks({ startHeight: %{1} });

console.log(getBlocks);
        `,
        options: {}
      },
      python: {}
    },
    parameters: {
      labels: ['startHeight'],
      exampleValues: [730000]
    },
    response: `[
  {
    "id": "0000000000000000000384f28cb3b9cf4377a39cfd6c29ae9466951de38c0529",
    "timestamp": 1648829449,
    "height": 730000,
    "version": 536870912,
    "bits": 386521239,
    "nonce": 3580664066,
    "difficulty": 28587155782195.14,
    "merkle_root": "efa344bcd6c0607f93b709515dd6dc5496178112d680338ebea459e3de7b4fbc",
    "tx_count": 1627,
    "size": 1210916,
    "weight": 3993515,
    "previousblockhash": "00000000000000000008b6f6fb83f8d74512ef1e0af29e642dd20daddd7d318f",
    "extras": {
      "coinbaseRaw": "0390230b1362696e616e63652f383038e0006f02cd583765fabe6d6d686355577affaad03015e732428a927a5d2d842471b350394139616bcb4401d804000000000000001a750000c9ad0000",
      "medianFee": 11,
      "feeRange": [
        1,
        11,
        11,
        11,
        18,
        21,
        660
      ],
      "reward": 641321983,
      "totalFees": 16321983,
      "avgFee": 10038,
      "avgFeeRate": 16,
      "pool": {
        "id": 105,
        "name": "Binance Pool",
        "slug": "binancepool"
      },
      "usd": null
    }
  },
  {
    "id": "00000000000000000008b6f6fb83f8d74512ef1e0af29e642dd20daddd7d318f",
    "timestamp": 1648828946,
    "height": 729999,
    "version": 793796608,
    "bits": 386521239,
    "nonce": 3477019455,
    "difficulty": 28587155782195.14,
    "merkle_root": "d84f9cc1823bd069c505061b1f6faabd809d67ab5354e9f6234312dc4bdb1ecf",
    "tx_count": 2574,
    "size": 1481957,
    "weight": 3993485,
    "previousblockhash": "000000000000000000071e6c86c2175aa86817cae2a77acd95372b55c1103d89",
    "extras": {
      "coinbaseRaw": "038f230b1362696e616e63652f373739d8002900ca5de7a9fabe6d6dda31112c36c10a523154eae76847579755cd4ae558ee2e6f9f200b05dd32a0bf04000000000000006372000000020000",
      "medianFee": 17,
      "feeRange": [
        2,
        11,
        14,
        17,
        19,
        28,
        502
      ],
      "reward": 649090210,
      "totalFees": 24090210,
      "avgFee": 9362,
      "avgFeeRate": 24,
      "pool": {
        "id": 105,
        "name": "Binance Pool",
        "slug": "binancepool"
      },
      "usd": null
    }
  },
  ...
]`,
    testnet: {
      parameters: {
        labels: ['startHeight'],
        exampleValues: [2091187]
      },
      response: `[
  {
    "id": "00000000000000533f63df886281a9fd74da163e84a21445153ff480e5f57970",
    "timestamp": 1630641890,
    "height": 2091187,
    "version": 545259520,
    "bits": 436273151,
    "nonce": 309403673,
    "difficulty": 16777216,
    "merkle_root": "4d6df12a4af11bb928c7b2930e0a4d2c3e268c6dc6a07462943ad1c4b6b96468",
    "tx_count": 26,
    "size": 8390,
    "weight": 22985,
    "previousblockhash": "0000000000000079103da7d296e1480295df795b7379e7dffd27743e214b0b32",
    "extras": {
      "coinbaseRaw": "03b3e81f3a205468697320626c6f636b20776173206d696e65642077697468206120636172626f6e206e6567617469766520706f77657220736f75726365201209687a2009092009020de601d7986a040000",
      "medianFee": 1,
      "feeRange": [
        1,
        1,
        1,
        1,
        5,
        56,
        5053
      ],
      "reward": 10547567,
      "totalFees": 781942,
      "avgFee": 31277,
      "avgFeeRate": 143,
      "pool": {
        "id": 137,
        "name": "Unknown",
        "slug": "unknown"
      },
      "usd": null
    }
  },
  {
    "id": "0000000000000079103da7d296e1480295df795b7379e7dffd27743e214b0b32",
    "timestamp": 1630641655,
    "height": 2091186,
    "version": 541065216,
    "bits": 436273151,
    "nonce": 2671302918,
    "difficulty": 16777216,
    "merkle_root": "c70fa944f2863dc0828ee93ec0407bb8473e3b9bb94854ffd3fa1ccb9855d76a",
    "tx_count": 43,
    "size": 11427,
    "weight": 32472,
    "previousblockhash": "00000000000000f015cb6ce3c007b56a053c4b3c3c86a36130e63310da787a30",
    "extras": {
      "coinbaseRaw": "03b2e81f3a205468697320626c6f636b20776173206d696e65642077697468206120636172626f6e206e6567617469766520706f77657220736f75726365201209687a2009092009020de601d7326c050000",
      "medianFee": 1,
      "feeRange": [
        1,
        1,
        1,
        1,
        5,
        11,
        49
      ],
      "reward": 9806663,
      "totalFees": 41038,
      "avgFee": 977,
      "avgFeeRate": 5,
      "pool": {
        "id": 137,
        "name": "Unknown",
        "slug": "unknown"
      },
      "usd": null
    }
  },
  ...
]`
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
