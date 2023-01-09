export const restApiDocsCode = {
    "get-difficulty-adjustment": {
        "mainnet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();"
        },
        "testnet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();"
        },
        "signet": {
            "curl": {
                "text": "/v1/difficulty-adjustment",
                "textDisplay": "/v1/difficulty-adjustment"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          difficulty\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n      });\n      const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n      document.getElementById(\"result\").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            difficulty\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n    });\n    const difficultyAdjustment = await difficulty.getDifficultyAdjustment();\n    console.log(difficultyAdjustment);\n};\ninit();"
        }
    },
    "get-stats": {
        "bisq": {
            "curl": {
                "text": "/stats",
                "textDisplay": "/stats"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://bisq.markets/bisq.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        statistics\n      } = bisqJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n      });\n      const stats = await statistics.getStats();\n      document.getElementById(\"result\").textContent = JSON.stringify(stats, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import bisqJS from \"@mempool/bisq.js\";\nconst init = async () => {\n    const {\n        statistics\n    } = bisqJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n    });\n    const stats = await statistics.getStats();\n    console.log(stats);\n};\ninit();"
        }
    },
    "get-blocks": {
        "mainnet": {
            "curl": {
                "text": "/v1/blocks/730000",
                "textDisplay": "/v1/blocks[/:startHeight]"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          blocks\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n      });\n      const getBlocks = await blocks.getBlocks({\n        startHeight: 730000\n      });\n      document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            blocks\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n    });\n    const getBlocks = await blocks.getBlocks({\n        startHeight: 730000\n    });\n    console.log(getBlocks);\n};\ninit();"
        },
        "testnet": {
            "curl": {
                "text": "/v1/blocks/2091187",
                "textDisplay": "/v1/blocks[/:startHeight]"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          blocks\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n      });\n      const getBlocks = await blocks.getBlocks({\n        startHeight: 2091187\n      });\n      document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            blocks\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n    });\n    const getBlocks = await blocks.getBlocks({\n        startHeight: 2091187\n    });\n    console.log(getBlocks);\n};\ninit();"
        },
        "signet": {
            "curl": {
                "text": "/v1/blocks/53783",
                "textDisplay": "/v1/blocks[/:startHeight]"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://mempool.space/mempool.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        bitcoin: {\n          blocks\n        }\n      } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n      });\n      const getBlocks = await blocks.getBlocks({\n        startHeight: 53783\n      });\n      document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import mempoolJS from \"@mempool/mempool.js\";\nconst init = async () => {\n    const {\n        bitcoin: {\n            blocks\n        }\n    } = mempoolJS({\n        hostname: 'DOCUMENT_LOCATION_HOST',\n        network: 'CURRENT_NETWORK'\n    });\n    const getBlocks = await blocks.getBlocks({\n        startHeight: 53783\n    });\n    console.log(getBlocks);\n};\ninit();"
        },
        "liquid": {
            "curl": {
                "text": "/blocks/1472246",
                "textDisplay": "/blocks[/:startHeight]"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://liquid.network/liquid.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        blocks\n      } = liquidJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n      });\n      const getBlocks = await blocks.getBlocks({\n        startHeight: 1472246\n      });\n      document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import liquidJS from \"@mempool/liquid.js\";\nconst init = async () => {\n    const {\n        blocks\n    } = liquidJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n    });\n    const getBlocks = await blocks.getBlocks({\n        startHeight: 1472246\n    });\n    console.log(getBlocks);\n};\ninit();"
        },
        "liquidtestnet": {
            "curl": {
                "text": "/blocks/150000",
                "textDisplay": "/blocks[/:startHeight]"
            }
        },
        "bisq": {
            "curl": {
                "text": "/blocks/0/5",
                "textDisplay": "/blocks/:m/:n"
            },
            "commonjs": "<!DOCTYPE html>\n\n<head>\n  <script src=\"https://bisq.markets/bisq.js\"></script>\n  <script>\n    const init = async () => {\n      const {\n        blocks\n      } = bisqJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n      });\n      const getBlocks = await blocks.getBlocks({\n        index: 0,\n        length: 5\n      });\n      document.getElementById(\"result\").textContent = JSON.stringify(getBlocks, undefined, 2);\n    };\n    init();\n  </script>\n</head>\n\n<body>\n  <pre id=\"result\"></pre>\n</body>\n\n</html>",
            "esmodule": "import bisqJS from \"@mempool/bisq.js\";\nconst init = async () => {\n    const {\n        blocks\n    } = bisqJS({\n        hostname: 'DOCUMENT_LOCATION_HOST'\n    });\n    const getBlocks = await blocks.getBlocks({\n        index: 0,\n        length: 5\n    });\n    console.log(getBlocks);\n};\ninit();"
        }
    }
};