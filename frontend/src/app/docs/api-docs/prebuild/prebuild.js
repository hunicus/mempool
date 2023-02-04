const fs = require('fs');
const jsb = require("js-beautify");
const htmlb = require("js-beautify").html;
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
const request = require('request');
const apiDocs = require('../api-docs-data.js');
const apiDocsResponses = require('../api-docs-code.js');

const restDocs = apiDocs.restApiDocsData;
const restDocsCode = apiDocsResponses.restApiDocsCode;
const mode = process.argv;
const networks = ["mainnet", "testnet", "signet", "liquid", "liquidtestnet", "bisq"];

let formattedData = {};
let responseObj = {};
let merged = {};
let url = '';

loadLanguages( ['json', 'bash'] ) ; //for prism syntax highlighting; javascript is loaded by default

console.log( "\ngetting rest api docs data --------------------->\n" );

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
                formattedData[e.fragment][n]['commonjsHighlighted'] = Prism.highlight( formattedData[e.fragment][n]['commonjs'], Prism.languages.javascript, 'javascript' );
            }

            if( e.showCodeExamples[n][2] ) {
                formattedData[e.fragment][n]['esmodule'] = wrapEsModule(merged, n);
                formattedData[e.fragment][n]['esmoduleHighlighted'] = Prism.highlight( formattedData[e.fragment][n]['esmodule'], Prism.languages.javascript, 'javascript' );
            }

            //get responses
            
            console.log( 'working on response for ' + e.fragment + ' / ' + n );
            if( merged.hasOwnProperty('responseSettings') && merged.responseSettings.hasOwnProperty('explicit') && merged.responseSettings.explicit.length > 0 ) {
                console.log( 'attempting to use explicitly set string for ' + e.fragment + ' / ' + n );
                formattedData[e.fragment][n]['response'] = JSON.stringify( JSON.parse(merged.responseSettings.explicit ), undefined, 2 );
                formattedData[e.fragment][n]['responseHighlighted'] = Prism.highlight( JSON.stringify( JSON.parse( merged.responseSettings.explicit ), undefined, 2 ), Prism.languages.json, 'json');
                writeTsFile( formattedData );
                console.log( 'successfully saved response for ' + e.fragment + ' / ' + n + ' (used explicit string) ✅' );
            } else {

                console.log( e.fragment + ' / ' + n + ' is not explicitly set' );

                if( restDocsCode.hasOwnProperty(e.fragment) && restDocsCode[e.fragment].hasOwnProperty(n) && restDocsCode[e.fragment][n].hasOwnProperty('response') ) {
                    console.log( e.fragment + ' / ' + n + ' is cached' );
                    formattedData[e.fragment][n]['response'] = restDocsCode[e.fragment][n]['response'];
                    formattedData[e.fragment][n]['responseHighlighted'] = Prism.highlight( restDocsCode[e.fragment][n]['response'], Prism.languages.json, 'json');
                    console.log( 'saved response for ' + e.fragment + ' / ' + n + ' (used cached string) ✅' );
                } else {
                    formattedData[e.fragment][n]['response'] = '';
                    formattedData[e.fragment][n]['responseHighlighted'] = '';
                }

                if( ( mode[2] === 'force-reset-all' ) || ( mode[2] === merged.fragment && typeof mode[3] === 'undefined' ) || ( mode[2] === merged.fragment && mode[3] === n ) || ( typeof mode[2] === 'undefined' && typeof mode[3] === 'undefined' && ( formattedData[e.fragment][n]['response'].length === 0 ) ) ) {
                    console.log( 'attempting to fetch ' + e.fragment + ' / ' + n + ' from live api' );
                    url = getUrl( n, merged.codeTemplates.curl.text );
                    (function(maxArrayLength){
                        request( url, function( error, response, body ) {
                            if( error ) {
                                console.log( 'error fetching ' + e.fragment + ' / ' + n + ' from live api ❌\n\n' + error );
                            } else {
                                console.log( 'successfully fetched ' + e.fragment + ' / ' + n + ' from live api' );
                                responseObj = JSON.parse(body);
                                truncateJSON( responseObj, maxArrayLength );
                                formattedData[e.fragment][n]['response'] = JSON.stringify( responseObj, undefined, 2 );
                                formattedData[e.fragment][n]['responseHighlighted'] = Prism.highlight( JSON.stringify( responseObj, undefined, 2 ), Prism.languages.json, 'json');
                                writeTsFile( formattedData );
                                console.log( 'successfully saved response for ' + e.fragment + ' / ' + n + ' (used live api fetch) ✅' );
                            }
                        });
                    })(merged.responseSettings.maxArrayLength);
                }
                
                writeTsFile( formattedData ); 
            }
            console.log( '\n' );

        });
    }
});

function wrapCommonJS( item, network ) {
    
    if( item.codeTemplates.commonjs.hasOwnProperty( 'options' ) && item.codeTemplates.commonjs.options.hasOwnProperty( 'noWrap' ) && item.codeTemplates.commonjs.options.noWrap ) {
        return item.codeTemplates.commonjs.text;
    }

    let text = normalizeHosts( item.codeTemplates.commonjs.text, network );

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

    return htmlb( `<!DOCTYPE html> <head> ${importText} <script> const init = async () => { ${text} }; init(); </script> </head> <body> ${resultHtml} </body> </html>`, { indent_size: 2 } );

}

function normalizeHosts( text, network ) {
    
    if( network === 'mainnet' || network === 'liquid' || network === 'bisq' ) {
        text = text.replace('mempoolJS();', `mempoolJS({ hostname: "%{DOCUMENT_LOCATION_HOST}" });`);
    } else {
        text = text.replace('mempoolJS();', `mempoolJS({ hostname: "%{DOCUMENT_LOCATION_HOST}", network: "%{CURRENT_NETWORK}" });`);
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

    let text = normalizeHosts( item.codeTemplates.esmodule.text, network );

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
                } else if( k1 === 'responseSettings' ) {
                    for( let k2 in item[ network ]['responseSettings'] ) {
                        if( !merged.hasOwnProperty('responseSettings') ) {
                            merged.responseSettings = {};
                        }
                        merged['responseSettings'][k2] = item[ network ][k1][k2];  
                    }
                } else {
                    merged[k1] = item[ network ][k1];
                }
            }
        }
    }
    if( !merged.hasOwnProperty('responseSettings') ) {
        merged.responseSettings = {};        
    }
    if( !merged.responseSettings.hasOwnProperty('maxArrayLength') ) {
        merged.responseSettings.maxArrayLength = 2;
    }
    merged.codeTemplates = processParameters( merged );
    return merged;
}

function processParameters( merged ) {
    for( let k in merged.codeTemplates ) {
        if( merged['codeTemplates'][k].hasOwnProperty('template') ) {
            if( k === 'curl' ) {
                merged.codeTemplates[k]['text'] = ( merged.hasOwnProperty('parameters') && merged.parameters.length > 0 ? insertCurlParameters( merged.codeTemplates[k]['template'], merged.parameters, false ) : merged.codeTemplates[k].template );
                merged.codeTemplates[k]['textDisplay'] = ( merged.hasOwnProperty('parameters') && merged.parameters.length > 0 ? insertCurlParameters( merged.codeTemplates[k]['template'], merged.parameters, true ) : merged.codeTemplates[k].template );
            } else {
                merged.codeTemplates[k]['text'] = ( merged.hasOwnProperty('parameters') && merged.parameters.length > 0 ? insertCodeParameters( merged.codeTemplates[k]['template'], merged.parameters, false ) : merged.codeTemplates[k].template );
            }
        }
    }
    return merged.codeTemplates;
}

function insertCurlParameters( templateText, parameters, display ) {
    for( let i = 0; i < parameters.length; i++ ) {
        templateText = templateText.replace( '%{' + (i+1) + '}', `${ !display || parameters[i]['required'] || parameters[i]['urlParam'] ? '' : '[' }${ parameters[i]['urlParam'] ? '' : '/' }${ display ? ':' + parameters[i]['label'] : parameters[i]['exampleValue'] }${ !display || parameters[i]['required'] || parameters[i]['urlParam'] ? '' : ']' }` );
    }
    return templateText;
}

function insertCodeParameters( templateText, parameters ) {
    for( let i = 0; i < parameters.length; i++ ) {
        templateText = templateText.replace( '%{' + (i+1) + '}', parameters[i]['exampleValue'] );
    }
    return templateText;
}

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

function truncateJSON( value, maxArrayLength ) {
    if( typeof value === 'object' ) {
        if( Array.isArray( value ) ) {
            if( value.length > maxArrayLength ) {
                value.length = maxArrayLength;
                value.push( "..." );
            }
            value.forEach( function(e) {
                truncateJSON( e, maxArrayLength );
            });
        } else if( value !== null ) {
            Object.keys(value).forEach(function( k, i ) {
                truncateJSON( value[k], maxArrayLength );
            });
        }
    }
}

function writeTsFile( data ) {
    fs.writeFileSync( '../api-docs-code.ts', '//DO NOT EDIT THIS FILE BY HAND\n\nexport const restApiDocsCode = ' + JSON.stringify( formattedData, undefined, 4 ) + ';' );
}
