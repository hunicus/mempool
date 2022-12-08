import { Component, Input, OnInit } from '@angular/core';
import { Env, StateService } from '../../services/state.service';

@Component({
  selector: 'app-code-template',
  templateUrl: './code-template.component.html',
  styleUrls: ['./code-template.component.scss']
})
export class CodeTemplateComponent implements OnInit {
  @Input() hostname: string;
  @Input() baseNetworkUrl: string;
  @Input() item: any;
  @Input() sampleUrl: string;
  env: Env;
  network: string;
  networkData: any;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.env = this.stateService.env;
    this.network = ( this.stateService.network === '' ) ? 'mainnet' : this.stateService.network;
    this.networkData = this.getNetworkData();
  }

  adjustContainerHeight( event ) {
    if( ( window.innerWidth <= 992 ) && ( this.item.httpRequestMethod !== "websocket" ) ) {
      const urlObj = new URL( window.location + "" );
      const endpointContainerEl = document.querySelector<HTMLElement>( urlObj.hash );
      const endpointContentEl = document.querySelector<HTMLElement>( urlObj.hash + " .endpoint-content" );
      window.setTimeout( function() {
        endpointContainerEl.style.height = endpointContentEl.clientHeight + 90 + "px";
      }, 550);
    }
  }

  getNetworkData() {
    if( this.item.hasOwnProperty( this.network ) ) {
      let merged = {};
      merged.description = this.item[ this.network ][ 'description' ] || this.item[ 'default' ][ 'description' ];
      merged.parameters = this.item[ this.network ][ 'parameters' ] || this.item[ 'default' ][ 'parameters' ];
      merged.response = this.item[ this.network ][ 'response' ] || this.item[ 'default' ][ 'response' ];
      if( this.item[ this.network ].hasOwnProperty[ 'codeTemplates' ] ) {
        merged.codeTemplates.curl = this.item[ this.network ][ 'codeTemplates' ][ 'curl'] || this.item[ 'default' ][ 'codeTemplates' ][ 'curl'] || undefined;
        merged.codeTemplates.commonJS = this.item[ this.network ][ 'codeTemplates' ][ 'commonJS'] || this.item[ 'default' ][ 'codeTemplates' ][ 'commonJS'] || undefined;
        merged.codeTemplates.esModule = this.item[ this.network ][ 'codeTemplates' ][ 'esModule'] || this.item[ 'default' ][ 'codeTemplates' ][ 'esModule'] || undefined;
        merged.codeTemplates.python = this.item[ this.network ][ 'codeTemplates' ][ 'python'] || this.item[ 'default' ][ 'codeTemplates' ][ 'python'] || undefined;
        return merged;
      } else {
        merged.codeTemplates = this.item[ 'default' ][ 'codeTemplates' ];
        return merged;
      }
    } else {
      return this.item.default;
    }
  }

  wrapCurlTemplate( curlUrl: string ) {
    if( this.item.httpRequestMethod === 'GET' ) {
      return `curl -sSL ${curlUrl}`;
    } else {
      return `curl -X POST -sSLd ${curlUrl}`;
    }
  }

  wrapCommonJS() {

    if( this.networkData.codeTemplates.commonJS.options.hasOwnProperty( 'noWrap' ) && this.networkData.codeTemplates.commonJS.options.noWrap ) {
      return this.networkData.codeTemplates.commonJS.text;
    }
    
    let text = this.normalizeHosts( this.networkData.codeTemplates.commonJS.text );

      /*if(this.network === '' || this.network === 'main') {
        codeText = this.replaceJSPlaceholder(codeText, code.codeSampleMainnet.esModule);
      }
      if (this.network === 'testnet') {
      codeText = this.replaceJSPlaceholder(codeText, code.codeSampleTestnet.esModule);
      }
      if (this.network === 'signet') {
        codeText = this.replaceJSPlaceholder(codeText, code.codeSampleSignet.esModule);
      }
      if (this.network === 'liquid' || this.network === 'liquidtestnet') {
        codeText = this.replaceJSPlaceholder(codeText, code.codeSampleLiquid.esModule);
      }
      if (this.network === 'bisq') {
        codeText = this.replaceJSPlaceholder(codeText, code.codeSampleBisq.esModule);
      }*/

    let importText = '';
    if( this.network === 'bisq') {
      importText = `<script src="https://bisq.markets/bisq.js"></script>`;
    } else if( this.network === 'liquid' || this.network === 'liquidtestnet' ) {
      importText = `<script src="https://liquid.network/liquid.js"></script>`;
    } else {
      importText = `<script src="https://mempool.space/mempool.js"></script>`;
    }

    let resultHtml = '<pre id="result"></pre>';
    if (this.item.httpRequestMethod === 'websocket') {
      resultHtml = `<h2>Blocks</h2><pre id="result-blocks">Waiting for data</pre><br>
  <h2>Mempool Info</h2><pre id="result-mempool-info">Waiting for data</pre><br>
  <h2>Transactions</h2><pre id="result-transactions">Waiting for data</pre><br>
  <h2>Mempool Blocks</h2><pre id="result-mempool-blocks">Waiting for data</pre><br>`;
    }

    return `<!DOCTYPE html>
<html>
<head>
  ${importText}
  <script>
    const init = async () => {
      ${text}
    };
    init();
  </script>
</head>
<body>
  ${resultHtml}
</body>
</html>`;
    
  }

  normalizeHosts( text: string ) {
    
    if( this.network === 'mainnet' || this.network === 'liquid' || this.network === 'bisq' ) {
      text = text.replace('mempoolJS();', `mempoolJS({
        hostname: '${document.location.hostname}'
      });`);
    } else {
      text = text.replace('mempoolJS();', `mempoolJS({
        hostname: '${document.location.hostname}',
        network: '${this.network}'
      });`);
    }

    if( this.network === 'mainnet' || this.network === 'testnet' || this.network === 'signet' ) {
      return text.replace('%{0}', 'bitcoin');
    } else {
      text = text.replace('{ %{0}: ', '');
      if( this.network === 'liquid' ) {
        return text.replace('} = mempoolJS();', ` = liquidJS();`);
      }
      if( this.network === 'bisq' ) {
        return text.replace('} = mempoolJS();', ` = bisqJS();`);
      }
    }
    
  }

  wrapImportTemplate() {
    if( this.network === 'bisq' ) {
      return `# npm
npm install @mempool/bisq.js --save

# yarn
yarn add @mempool/bisq.js`;
    } else if (this.network === 'liquid') {
      return `# npm
npm install @mempool/liquid.js --save

# yarn
yarn add @mempool/liquid.js`;
    } else {
      return `# npm
      npm install @mempool/mempool.js --save
      
      # yarn
      yarn add @mempool/mempool.js`
    }
  }

  wrapEsModule() {

    let text = this.normalizeHosts( this.networkData.codeTemplates.esModule.text );

    /*if(this.network === '' || this.network === 'main') {
      codeText = this.replaceJSPlaceholder(codeText, code.codeSampleMainnet.esModule);
    }
    if (this.network === 'testnet') {
    codeText = this.replaceJSPlaceholder(codeText, code.codeSampleTestnet.esModule);
    }
    if (this.network === 'signet') {
      codeText = this.replaceJSPlaceholder(codeText, code.codeSampleSignet.esModule);
    }
    if (this.network === 'liquid' || this.network === 'liquidtestnet') {
      codeText = this.replaceJSPlaceholder(codeText, code.codeSampleLiquid.esModule);
    }
    if (this.network === 'bisq') {
      codeText = this.replaceJSPlaceholder(codeText, code.codeSampleBisq.esModule);
    }*/

    let importText = '';
    if( this.network === 'bisq') {
      importText = `import bisqJS from "@mempool/bisq.js";`;
    } else if( this.network === 'liquid' || this.network === 'liquidtestnet' ) {
      importText = `import liquidJS from "@mempool/liquid.js";`;
    } else {
      importText = `import mempoolJS from "@mempool/mempool.js";`;
    }

    return `${importText}
const init = async () => {
${codeText}
};
init();`;
    
  }

  npmGithubLink(){
    if( this.network === 'bisq' ) {
      return 'https://github.com/mempool/mempool.js/tree/main/npm-bisq-js';
    } else if( this.network === 'liquid' || this.network === 'liquidtestnet' ) {
      return 'https://github.com/mempool/mempool.js/tree/main/npm-liquid-js';
    }
    return 'https://github.com/mempool/mempool.js';
  }

  npmModuleLink() {
    if( this.network === 'bisq' ) {
      return 'https://www.npmjs.org/package/@mempool/bisq.js';
    } else if( this.network === 'liquid' || this.network === 'liquidtestnet' ) {
      return 'https://www.npmjs.org/package/@mempool/liquid.js';
    }
    return 'https://www.npmjs.org/package/@mempool/mempool.js';
  }

  wrapPythonTemplate() {
    return ( ( this.network === 'testnet' || this.network === 'signet' ) ? ( this.networkData.codeTemplates.python.replace( "wss://mempool.space/api/v1/ws", "wss://mempool.space/" + this.network + "/api/v1/ws" ) ) : this.networkData.codeTemplates.python );
  }

  replaceJSPlaceholder(text: string, code: any) {
    for (let index = 0; index < code.length; index++) {
      const textReplace = code[index];
      const indexNumber = index + 1;
      text = text.replace('%{' + indexNumber + '}', textReplace);
    }
    return text;
  }

}
