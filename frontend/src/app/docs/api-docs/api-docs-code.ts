//DO NOT EDIT THIS FILE BY HAND

export const restApiDocsCode = {
    "get-difficulty-adjustment": {
        "mainnet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\"\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "commonjsHighlighted": "<span class=\"token operator\">&lt;</span><span class=\"token operator\">!</span><span class=\"token constant\">DOCTYPE</span> html<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>head<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script src<span class=\"token operator\">=</span><span class=\"token string\">\"https://mempool.space/mempool.js\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n      <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n          difficulty\n        <span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span>\n      <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      document<span class=\"token punctuation\">.</span><span class=\"token function\">getElementById</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"result\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span>textContent <span class=\"token operator\">=</span> <span class=\"token constant\">JSON</span><span class=\"token punctuation\">.</span><span class=\"token function\">stringify</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">,</span> <span class=\"token keyword\">undefined</span><span class=\"token punctuation\">,</span> <span class=\"token number\">2</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n    <span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>head<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>body<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>pre id<span class=\"token operator\">=</span><span class=\"token string\">\"result\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>pre<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>body<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>html<span class=\"token operator\">></span>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\"\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();",
            "esmoduleHighlighted": "<span class=\"token keyword\">import</span> mempoolJS <span class=\"token keyword\">from</span> <span class=\"token string\">\"@mempool/mempool.js\"</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n            difficulty\n        <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n<span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>",
            "response": "{\n  \"progressPercent\": 58.13492063492064,\n  \"difficultyChange\": 0.9957387036869436,\n  \"estimatedRetargetDate\": 1675014783896,\n  \"remainingBlocks\": 844,\n  \"remainingTime\": 501406896,\n  \"previousRetarget\": 10.256723766205752,\n  \"nextRetargetHeight\": 774144,\n  \"timeAvg\": 594084,\n  \"timeOffset\": 0\n}",
            "responseHighlighted": "<span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"progressPercent\"</span><span class=\"token operator\">:</span> <span class=\"token number\">58.13492063492064</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"difficultyChange\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.9957387036869436</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"estimatedRetargetDate\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1675014783896</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingBlocks\"</span><span class=\"token operator\">:</span> <span class=\"token number\">844</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingTime\"</span><span class=\"token operator\">:</span> <span class=\"token number\">501406896</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"previousRetarget\"</span><span class=\"token operator\">:</span> <span class=\"token number\">10.256723766205752</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"nextRetargetHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">774144</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeAvg\"</span><span class=\"token operator\">:</span> <span class=\"token number\">594084</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeOffset\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span>\n<span class=\"token punctuation\">}</span>"
        },
        "testnet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\",\n        network: \"CURRENT_NETWORK\"\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "commonjsHighlighted": "<span class=\"token operator\">&lt;</span><span class=\"token operator\">!</span><span class=\"token constant\">DOCTYPE</span> html<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>head<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script src<span class=\"token operator\">=</span><span class=\"token string\">\"https://mempool.space/mempool.js\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n      <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n          difficulty\n        <span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token literal-property property\">network</span><span class=\"token operator\">:</span> <span class=\"token string\">\"CURRENT_NETWORK\"</span>\n      <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      document<span class=\"token punctuation\">.</span><span class=\"token function\">getElementById</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"result\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span>textContent <span class=\"token operator\">=</span> <span class=\"token constant\">JSON</span><span class=\"token punctuation\">.</span><span class=\"token function\">stringify</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">,</span> <span class=\"token keyword\">undefined</span><span class=\"token punctuation\">,</span> <span class=\"token number\">2</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n    <span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>head<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>body<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>pre id<span class=\"token operator\">=</span><span class=\"token string\">\"result\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>pre<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>body<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>html<span class=\"token operator\">></span>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\",\n        network: \"CURRENT_NETWORK\"\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();",
            "esmoduleHighlighted": "<span class=\"token keyword\">import</span> mempoolJS <span class=\"token keyword\">from</span> <span class=\"token string\">\"@mempool/mempool.js\"</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n            difficulty\n        <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token literal-property property\">network</span><span class=\"token operator\">:</span> <span class=\"token string\">\"CURRENT_NETWORK\"</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n<span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>",
            "response": "{\n  \"progressPercent\": 19.791666666666664,\n  \"difficultyChange\": -24.51259542345785,\n  \"estimatedRetargetDate\": 1675798633578,\n  \"remainingBlocks\": 1617,\n  \"remainingTime\": 1285246578,\n  \"previousRetarget\": 11.257285987237662,\n  \"nextRetargetHeight\": 2419200,\n  \"timeAvg\": 794834,\n  \"timeOffset\": 0\n}",
            "responseHighlighted": "<span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"progressPercent\"</span><span class=\"token operator\">:</span> <span class=\"token number\">19.791666666666664</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"difficultyChange\"</span><span class=\"token operator\">:</span> <span class=\"token number\">-24.51259542345785</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"estimatedRetargetDate\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1675798633578</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingBlocks\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1617</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingTime\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1285246578</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"previousRetarget\"</span><span class=\"token operator\">:</span> <span class=\"token number\">11.257285987237662</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"nextRetargetHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">2419200</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeAvg\"</span><span class=\"token operator\">:</span> <span class=\"token number\">794834</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeOffset\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span>\n<span class=\"token punctuation\">}</span>"
        },
        "signet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\",\n        network: \"CURRENT_NETWORK\"\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "commonjsHighlighted": "<span class=\"token operator\">&lt;</span><span class=\"token operator\">!</span><span class=\"token constant\">DOCTYPE</span> html<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>head<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script src<span class=\"token operator\">=</span><span class=\"token string\">\"https://mempool.space/mempool.js\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n      <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n          difficulty\n        <span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token literal-property property\">network</span><span class=\"token operator\">:</span> <span class=\"token string\">\"CURRENT_NETWORK\"</span>\n      <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      document<span class=\"token punctuation\">.</span><span class=\"token function\">getElementById</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"result\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span>textContent <span class=\"token operator\">=</span> <span class=\"token constant\">JSON</span><span class=\"token punctuation\">.</span><span class=\"token function\">stringify</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">,</span> <span class=\"token keyword\">undefined</span><span class=\"token punctuation\">,</span> <span class=\"token number\">2</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n    <span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>head<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span>body<span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span>pre id<span class=\"token operator\">=</span><span class=\"token string\">\"result\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>pre<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>body<span class=\"token operator\">></span>\n\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>html<span class=\"token operator\">></span>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: \"DOCUMENT_LOCATION_HOST\",\n        network: \"CURRENT_NETWORK\"\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();",
            "esmoduleHighlighted": "<span class=\"token keyword\">import</span> mempoolJS <span class=\"token keyword\">from</span> <span class=\"token string\">\"@mempool/mempool.js\"</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> <span class=\"token function-variable function\">init</span> <span class=\"token operator\">=</span> <span class=\"token keyword\">async</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">bitcoin</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n            difficulty\n        <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">mempoolJS</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n        <span class=\"token literal-property property\">hostname</span><span class=\"token operator\">:</span> <span class=\"token string\">\"DOCUMENT_LOCATION_HOST\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token literal-property property\">network</span><span class=\"token operator\">:</span> <span class=\"token string\">\"CURRENT_NETWORK\"</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token keyword\">const</span> difficultyAdjustment <span class=\"token operator\">=</span> <span class=\"token keyword\">await</span> difficulty<span class=\"token punctuation\">.</span><span class=\"token function\">getDifficultyAdjustment</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span>difficultyAdjustment<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n<span class=\"token function\">init</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>",
            "response": "{\n  \"progressPercent\": 0.6448412698412698,\n  \"difficultyChange\": 0,\n  \"estimatedRetargetDate\": 1675715187000,\n  \"remainingBlocks\": 2003,\n  \"remainingTime\": 1201800000,\n  \"previousRetarget\": 0,\n  \"nextRetargetHeight\": 129024,\n  \"timeAvg\": 600000,\n  \"timeOffset\": 0\n}",
            "responseHighlighted": "<span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"progressPercent\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.6448412698412698</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"difficultyChange\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"estimatedRetargetDate\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1675715187000</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingBlocks\"</span><span class=\"token operator\">:</span> <span class=\"token number\">2003</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"remainingTime\"</span><span class=\"token operator\">:</span> <span class=\"token number\">1201800000</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"previousRetarget\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"nextRetargetHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">129024</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeAvg\"</span><span class=\"token operator\">:</span> <span class=\"token number\">600000</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"timeOffset\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span>\n<span class=\"token punctuation\">}</span>"
        }
    }
};