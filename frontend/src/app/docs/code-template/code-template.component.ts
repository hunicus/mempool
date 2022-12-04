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
  curlCodeTemplate: string;
  commonJsCodeTemplate: string;
  esModuleCodeTemplate: string;
  pythonCodeTemplate: string;
  responseTemplate: string;
  env: Env;
  network: string;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.curlCodeTemplate = this.sampleUrl;
    this.commonJsCodeTemplate = this.getCodeTemplate( 'commonJS' );
    this.esModuleCodeTemplate = this.getCodeTemplate( 'esModule' );
    this.pythonCodeTemplate = this.getCodeTemplate( 'python' );
    this.responseTemplate = this.getResponseTemplate();
    this.env = this.stateService.env;
    this.network = ( this.stateService.network === "" ) ? "mainnet" : this.stateService.network;
  }

  getCodeTemplate( templateType ) {
    if( this.item.hasOwnProperty( this.stateService.network ) && this.item[ this.stateService.network ].hasOwnProperty( 'codeTemplates' ) &&  this.item[ this.stateService.network ][ 'codeTemplates' ].hasOwnProperty( templateType ) ) {
      return this.item[ this.stateService.network ][ 'codeTemplates' ][ templateType ];
    } else if( this.item.default.codeTemplates.hasOwnProperty( templateType ) ) {
      return this.item[ 'default' ][ 'codeTemplates' ][ templateType ];
    } else {
      return "";
    }
  }

  getResponseTemplate() {
    if( this.item.hasOwnProperty( this.stateService.network ) && this.item[ this.stateService.network ].hasOwnProperty( 'response' ) ) {
      return this.item[ this.stateService.network ][ 'response' ];
    } else if( this.item.default.hasOwnProperty( 'response' ) ) {
      return this.item[ 'default' ][ 'response' ];
    } else {
      return "";
    }
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

  normalizeHostsESModule(codeText: string) {
    if (this.env.BASE_MODULE === 'mempool') {
      if (['liquid', 'bisq'].includes(this.network)) {
        codeText = codeText.replace('%{0}', this.network);
      } else {
        codeText = codeText.replace('%{0}', 'bitcoin');
      }
      if(['', 'main', 'liquid', 'bisq', 'liquidtestnet'].includes(this.network)) {
        codeText = codeText.replace('mempoolJS();', `mempoolJS({
    hostname: '${document.location.hostname}'
  });`);
      } else {
        codeText = codeText.replace('mempoolJS();', `mempoolJS({
    hostname: '${document.location.hostname}',
    network: '${this.network}'
  });`);
      }
    }

    if (this.env.BASE_MODULE === 'bisq') {
      codeText = codeText.replace('} = mempoolJS();', ` = bisqJS();`);
      codeText = codeText.replace('{ %{0}: ', '');
    }

    if (this.env.BASE_MODULE === 'liquid') {
      codeText = codeText.replace('} = mempoolJS();', ` = liquidJS();`);
      codeText = codeText.replace('{ %{0}: ', '');
    }
    return codeText;
  }

  normalizeHostsCommonJS(codeText: string) {
    if (this.env.BASE_MODULE === 'mempool') {
      if (['liquid', 'bisq'].includes(this.network)) {
        codeText = codeText.replace('%{0}', this.network);
      } else {
        codeText = codeText.replace('%{0}', 'bitcoin');
      }
      if(['', 'main', 'liquid', 'bisq'].includes(this.network)) {
        codeText = codeText.replace('mempoolJS();', `mempoolJS({
          hostname: '${document.location.hostname}'
        });`);
      } else {
        codeText = codeText.replace('mempoolJS();', `mempoolJS({
          hostname: '${document.location.hostname}',
          network: '${this.network}'
        });`);
      }
    }

    if (this.env.BASE_MODULE === 'bisq') {
      codeText = codeText.replace('} = mempoolJS();', ` = bisqJS();`);
      codeText = codeText.replace('{ %{0}: ', '');
    }

    if (this.env.BASE_MODULE === 'liquid') {
      codeText = codeText.replace('} = mempoolJS();', ` = liquidJS();`);
      codeText = codeText.replace('{ %{0}: ', '');
    }
    return codeText;
  }

  wrapEsModule( response: string ) {
    let codeText: string;
    
    codeText = this.normalizeHostsESModule(response);

    if(this.network === 'mainnet') {
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
    }

    let importText = `import mempoolJS from "@mempool/mempool.js";`;
    if (this.env.BASE_MODULE === 'bisq') {
      importText = `import bisqJS from "@mempool/bisq.js";`;
    }
    if (this.env.BASE_MODULE === 'liquid') {
      importText = `import liquidJS from "@mempool/liquid.js";`;
    }

    return `${importText}

const init = async () => {
${codeText}
};

init();`;
    
  }

  wrapCommonJS(code: any) {
    let codeText: string;
    if (code.codeTemplate) {
      codeText = this.normalizeHostsCommonJS(code.codeTemplate.commonJS);

      if(this.network === '' || this.network === 'main') {
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
      }

      if (code.noWrap) {
        return codeText;
      }

      let importText = `<script src="https://mempool.space/mempool.js"></script>`;
      if (this.env.BASE_MODULE === 'bisq') {
        importText = `<script src="https://bisq.markets/bisq.js"></script>`;
      }
      if (this.env.BASE_MODULE === 'liquid') {
        importText = `<script src="https://liquid.network/liquid.js"></script>`;
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
        ${codeText}
      };
      init();
    </script>
  </head>
  <body>
    ${resultHtml}
  </body>
</html>`;
    }
  }

  wrapImportTemplate() {

    let importTemplate = `# npm
npm install @mempool/mempool.js --save

# yarn
yarn add @mempool/mempool.js`;

    if (this.env.BASE_MODULE === 'bisq') {
      importTemplate = `# npm
npm install @mempool/bisq.js --save

# yarn
yarn add @mempool/bisq.js`;
    }

    if (this.env.BASE_MODULE === 'liquid') {
      importTemplate = `# npm
npm install @mempool/liquid.js --save

# yarn
yarn add @mempool/liquid.js`;
    }

    return importTemplate;
  }

  wrapCurlTemplate( curlUrl: string ) {
    if( this.item.httpRequestMethod === 'GET' ) {
      return `curl -sSL ${curlUrl}`;
    } else {
      return `curl -X POST -sSLd ${curlUrl}`;
    }
  }

  wrapPythonTemplate(code: any) {
    return ( ( this.network === 'testnet' || this.network === 'signet' ) ? ( code.codeTemplate.python.replace( "wss://mempool.space/api/v1/ws", "wss://mempool.space/" + this.network + "/api/v1/ws" ) ) : code.codeTemplate.python );
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
