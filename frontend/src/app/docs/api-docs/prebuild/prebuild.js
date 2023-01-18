const fs = require('fs');
const jsb = require("js-beautify");
const htmlb = require("js-beautify").html;
const request = require('request');
const apiDocs = require('../api-docs-data.js');
const apiDocsResponses = require('../api-docs-code.js');

const restDocs = apiDocs.restApiDocsData;
const restDocsCode = apiDocsResponses.restApiDocsCode;
const mode = process.argv[2];
const networks = ["mainnet", "testnet", "signet", "liquid", "liquidtestnet", "bisq"];

let formattedData = {};
let responseObj = {};
let merged = {};
let url = '';

//get existing data

restDocs.forEach( function(e) {
    
    if( e.type === 'endpoint' ) {

        if( !formattedData.hasOwnProperty(e.fragment) ) {
            formattedData[e.fragment] = {};
        }

        e.showConditions.forEach( function(n) {
            
            merged = getMergedItem( e, n );
            
            if( !formattedData[e.fragment].hasOwnProperty(n) ) {
                formattedData[e.fragment][n] = {};
            }

            if( e.showCodeExamples[n][0] ) {
                formattedData[e.fragment][n]['curl'] = {};
                formattedData[e.fragment][n]['curl']['text'] = merged.codeTemplates.curl.text;
                formattedData[e.fragment][n]['curl']['textDisplay'] = merged.codeTemplates.curl.textDisplay;
            }
            
            if( e.showCodeExamples[n][1] ) {
                formattedData[e.fragment][n]['commonjs'] = wrapCommonJS(merged, n);
            }

            if( e.showCodeExamples[n][2] ) {
                formattedData[e.fragment][n]['esmodule'] = wrapEsModule(merged, n);
            }
            
            if( !merged.responseSettings.skip && ( ( mode === 'force-reset-all' ) || ( ( ( typeof mode === 'undefined' ) || ( mode === merged.fragment ) ) && !merged.responseSettings.freeze ) ) ) {
                url = getUrl( n, merged.codeTemplates.curl.text );
                request( url, function( error, response, body ) {
                    if( error ) {
                        console.log( '\n\nERROR FETCHING ' + url + ' -->\n\n' + error + '\n\n' );
                    } else {
                        responseObj = JSON.parse(body);
                        truncateJSON( responseObj );
                        formattedData[e.fragment][n]['response'] = JSON.stringify( responseObj, undefined, 2 );
                        writeTsFile( formattedData );
                    }
                });
            } else {
                formattedData[e.fragment][n]['response'] = ( restDocsCode[e.fragment][n].hasOwnProperty('response') ? restDocsCode[e.fragment][n]['response'] : '' );
                writeTsFile( formattedData );
            }
        });
    }
});

function wrapCommonJS( item, network ) {
    
    if( item.codeTemplates.commonjs.hasOwnProperty( 'options' ) && item.codeTemplates.commonjs.options.hasOwnProperty( 'noWrap' ) && item.codeTemplates.commonjs.options.noWrap ) {
        return item.codeTemplates.commonjs.text;
    }

    let text = normalizeHosts( item.codeTemplates.commonjs.text, 'commonjs', network );

    let importText = '';
    if( network === 'bisq') {
        importText = `<script src="https://bisq.markets/bisq.js"></script>`;
    } else if( network === 'liquid' || network === 'liquidtestnet' ) {
        importText = `<script src="https://liquid.network/liquid.js"></script>`;
    } else {
        importText = `<script src="https://mempool.space/mempool.js"></script>`;
    }

    let resultHtml = '<pre id="result"></pre>';

    if( item.httpRequestMethod === 'websocket' ) {
        resultHtml = `<h2>Blocks</h2><pre id="result-blocks">Waiting for data</pre><br> <h2>Mempool Info</h2><pre id="result-mempool-info">Waiting for data</pre><br> <h2>Transactions</h2><pre id="result-transactions">Waiting for data</pre><br> <h2>Mempool Blocks</h2><pre id="result-mempool-blocks">Waiting for data</pre><br>`;
    }

    return htmlb(`<!DOCTYPE html> <head> ${importText} <script> const init = async () => { ${text} }; init(); </script> </head> <body> ${resultHtml} </body> </html>`, { indent_size: 2 } );

}

function normalizeHosts( text, whichTemplate, network ) {

    if( network === 'mainnet' || network === 'liquid' || network === 'bisq' ) {
        text = text.replace('mempoolJS();', `mempoolJS({ hostname: 'DOCUMENT_LOCATION_HOST' });`);
    } else {
        text = text.replace('mempoolJS();', `mempoolJS({ hostname: 'DOCUMENT_LOCATION_HOST', network: 'CURRENT_NETWORK' });`);
    }

    if( network === 'mainnet' || network === 'testnet' || network === 'signet' ) {
        return text.replace('%{0}', 'bitcoin');
    } else {
        text = text.replace('{ %{0}: ', '');
        if( network === 'liquid' ) {
            return text.replace('} = mempoolJS({', ` = liquidJS({`);
        }
        if( network === 'bisq' ) {
            return text.replace('} = mempoolJS({', ` = bisqJS({`);
        }
    }

}

function wrapEsModule( item, network ) {

    if( item.codeTemplates.esmodule.hasOwnProperty( 'options' ) && item.codeTemplates.esmodule.options.hasOwnProperty( 'noWrap' ) && item.codeTemplates.esmodule.options.noWrap ) {
        return item.codeTemplates.esmodule.text;
    }

    let text = normalizeHosts( item.codeTemplates.esmodule.text, 'esmodule', network );

    let importText = '';
    if( network === 'bisq') {
        importText = `import bisqJS from "@mempool/bisq.js";`;
    } else if( network === 'liquid' ) {
        importText = `import liquidJS from "@mempool/liquid.js";`;
    } else {
        importText = `import mempoolJS from "@mempool/mempool.js";`;
    }

    return jsb(`${importText} const init = async () => { ${text} }; init();`);

}

//enables selective overriding for network-specific attributes
function getMergedItem( item, network ) {
    let merged = {};
    Object.assign( merged, item );
    networks.forEach( n => delete merged[n] );
    if( item.hasOwnProperty( network ) ) {
        for( let k1 in item[ network ] ) {
            if( item[ network ].hasOwnProperty(k1) ) {
                if( k1 == 'codeTemplates' ) {
                    for( let k2 in item[ network ]['codeTemplates'] ) {
                        merged['codeTemplates'][k2] = item[ network ][k1][k2];  
                    }
                } else {
                    merged[k1] = item[ network ][k1];
                }
            }
        }
    }
    merged.codeTemplates = processParameters( merged );
    return merged;
}

function processParameters( merged ) {
    for( let k in merged.codeTemplates ) {
        if( merged['codeTemplates'][k].hasOwnProperty('template') ) {
            if( k === 'curl' ) {
                merged.codeTemplates[k]['textDisplay'] = ( merged.parameters.labels.length > 0 ? insertParameters( merged.codeTemplates[k]['template'], merged.parameters.labels, true ) : merged.codeTemplates[k].template );
            }
            merged.codeTemplates[k]['text'] = ( merged.parameters.exampleValues.length > 0 ? insertParameters( merged.codeTemplates[k]['template'], merged.parameters.exampleValues, false ) : merged.codeTemplates[k].template );
        }
    }
    return merged.codeTemplates;
  }

  function insertParameters( templateText, parameters, isCurl ) {
    for( let i = 0; i < parameters.length; i++ ) {
        templateText = templateText.replace( ( isCurl ? '/' : '' ) + '%{' + (i+1) + '}', parameters[i] );
    }
    return templateText;
}


/*function getResponse( network, path ) {
    url = getUrl( network, path );
    
    request( url, function( error, response, body ) {
        if( error ) {
            console.log( '\n\nERROR FETCHING ' + url + ' -->\n\n' + error + '\n\n' );
        } else {
            responseObj = JSON.parse(body);
            return JSON.stringify( responseObj, undefined, 2 );
        }
    });
}*/

function getUrl( network, path ) {
    switch( network ) {
        case 'mainnet':
            return 'https://mempool.space/api' + path;
            break;
        case 'testnet':
            return 'https://mempool.space/testnet/api' + path;
            break;
        case 'signet':
            return 'https://mempool.space/signet/api' + path;
            break;
        case 'liquid':
            return 'https://liquid.network/api' + path;
            break;
        case 'liquidtestnet':
            return 'https://liquid.network/liquidtestnet/api' + path;
            break;
        case 'bisq':
            return 'https://bisq.markets/api' + path;
            break;
    }
}

function truncateJSON( value ) {
    if( typeof value === 'object' ) {
        if( Array.isArray( value ) ) {
            if( value.length > 2 ) {
                value.length = 2;
                value.push( { "...": "..." } );
            }
            value.forEach( function(e) {
                truncateJSON( e );
            });
        } else if( value !== null ) {
            console.log(value);
            Object.keys(value).forEach(function( k, i ) {
                truncateJSON( value[k] );
            });
        }
    }
}

function writeTsFile( data ) {
    fs.writeFileSync( '../api-docs-code.ts', '//DO NOT EDIT THIS FILE BY HAND\n\nexport const restApiDocsCode = ' + JSON.stringify( formattedData, undefined, 4 ) + ';' );
}