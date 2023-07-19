<!--------------------------------------------------------------------------------------------------

  EXAMPLE OF HOW AN REST API DOC OBJECT WORKS

  {
    //GENERAL INFO
    //the following properties must be specified for every rest endpoint

    type: "endpoint",                                                               //string; must be either 'endpoint' or 'category'
    category: "blocks",             
    httpRequestMethod: "GET",       
    fragment: "get-blocks",                                                         //string; for anchor links
    title: "GET Blocks",            
    showConditions: bitcoinNetworks.concat(liquidNetworks).concat(["bisq"]),        //array; determines which network's docs pages show the endpoint
    showCodeExamples: showCodeExamples,                                             //object; determines which code examples are shown on each network, can be modified using toggleCodeExampleVisibility() for convenience

    //PROPERTIES FOR ALL NETWORKS
    //the following properties apply to ALL networks unless overridden 
    //in network-specific objects (see signet and bisq objects below 
    //for examples)

    description: "Returns details on the past 15 blocks with fee and mining details in an <code>extras</code> field. If <code>:startHeight</code> is specified, the past 15 blocks before (and including) <code>:startHeight</code> are returned.",

    //put code templates on single line (no line breaks); prebuild.js will format
    codeTemplates: {
      curl: {
        template: `/v1/blocks%{1}`  //do not include forward slashes before parameter placeholders
      },
      commonjs: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
      },
      esmodule: {
        template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ startHeight: %{1} }); console.log(getBlocks);`
      }
    },

    parameters: [
      {
        label: 'startHeight',
        exampleValues: '730000',
        required: false,            //boolean; if not required, url will show with square brackets around parameter to indicate optionality
        urlParam: false             //boolean; should be true if parameter is in /api/block/parameter format, and false if in /api/block?param=value format
      }
    ],

    //PROPERTIES FOR ALL NETWORKS - RESPONSE FETCHING SETTINGS
    //setting `explicit` disables response fetching and uses the provided
    //text as a response.

    responseSettings: {},           //optional; can be overridden by responseSettings objects set by network

    //PROPERTIES FOR SIGNET ONLY (EXAMPLE)
    //the following properties override corresponding properties from above
    //for signet only
    //a parameters override, if provided, must specify BOTH labels AND 
    //corresponding exampleValues...the entire parameters object is overridden,
    //so specifying just exampleValues will NOT work.

    signet: {
      parameters: [
        {
          label: 'startHeight',
          exampleValues: '53783',
          required: false,
          urlParam: false
        }
      ],
      responseSettings: {                                   //properties specified here override responseSettings properties from above
        explicit: '{ "btc": "hodl", "usd": "shitcoin" }',   //specify a response to use in place of fetching one from the server
        json: true,                                         //default is true; specify as false to avoid parsing response as json
        show: true,                                         //hides response entirely; only use if no response should be shown at all (e.g. POST, etc)
        maxArrayLength: 3                                   //all arrays in response are automatically (and recursively) truncated to the specified length (default is 2)
      },
    },

    //PROPERTIES FOR BISQ ONLY (EXAMPLE)
    //the following properties override corresponding properties from above 
    //when bisq is the network
    //take note of the options property for commonjs...it is meant to 
    //specify optional options for special treatment; for example, 
    //noWrap does not wrap template with boilerplate javascript code 
    //(needed for liquid's `/api/v1/asset/:asset_id/icon` endpoint)
    //other options can be specified and implemented as needed.

    bisq: {
      description: "<p>Returns the past <code>n</code> blocks with BSQ transactions starting <code>m</code> blocks ago.</p><p>Assume a block height of 700,000. Query <code>/blocks/0/10</code> for the past 10 blocks before 700,000 with BSQ transactions. Query <code>/blocks/1000/10</code> for the past 10 blocks before 699,000 with BSQ transactions.",
      codeTemplates: {
        curl: {
          template: `/blocks%{1}%{2}`       //make sure to not include forward slashes before parameter placeholders
        },
        commonjs: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);`
          options: { "noWrap": true }
        },,
        esmodule: {
          template: `const { %{0}: { blocks } } = mempoolJS(); const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} }); console.log(getBlocks);`
        }
      },
      parameters: [                         //must specify each property for each parameter
        {
          label: 'm',
          exampleValue: 0,
          required: true,
          urlParam: false
        },
        {
          label: 'n',
          exampleValue: 5,
          required: true,
          urlParam: false
        }
      ]
    }

  }
  
--------------------------------------------------------------------------------------------------->