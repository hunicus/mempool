import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-code-template',
  templateUrl: './code-template.component.html',
  styleUrls: ['./code-template.component.scss']
})
export class CodeTemplateComponent implements OnInit {
  @Input() hostname: string;
  @Input() item: any;
  @Input() sampleUrl: string;
  network: string;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.network = ( this.stateService.network === '' ) ? 'mainnet' : this.stateService.network;
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

  wrapCurlTemplate( curlUrl: string ) {
    if( this.item.httpRequestMethod === 'GET' ) {
      return `curl -sSL "${curlUrl}"`;
    } else {
      return `curl -X POST -sSLd "${curlUrl}"`;
    }
  }

  wrapCommonJS() {
    
    if( this.item.codeTemplates.commonjs.options.hasOwnProperty( 'noWrap' ) && this.item.codeTemplates.commonjs.options.noWrap ) {
      return this.item.codeTemplates.commonjs.text;
    }
    
    let text = this.normalizeHosts( this.item.codeTemplates.commonjs.text, 'commonjs' );

    let importText = '';
    if( this.network === 'bisq') {
      importText = `<script src="https://bisq.markets/bisq.js"></script>`;
    } else if( this.network === 'liquid' || this.network === 'liquidtestnet' ) {
      importText = `<script src="https://liquid.network/liquid.js"></script>`;
    } else {
      importText = `<script src="https://mempool.space/mempool.js"></script>`;
    }

    let resultHtml = '<pre id="result"></pre>';
    if( this.item.httpRequestMethod === 'websocket' ) {
      resultHtml = `<h2>Blocks</h2><pre id="result-blocks">Waiting for data</pre><br>
  <h2>Mempool Info</h2><pre id="result-mempool-info">Waiting for data</pre><br>
  <h2>Transactions</h2><pre id="result-transactions">Waiting for data</pre><br>
  <h2>Mempool Blocks</h2><pre id="result-mempool-blocks">Waiting for data</pre><br>`;
    }

    return `<!DOCTYPE html>
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

  normalizeHosts( text: string, whichTemplate: string ) {

    const esSpaceAdder = ( whichTemplate === 'esmodule' ) ? '' : ' '.repeat(6);
    
    if( this.network === 'mainnet' || this.network === 'liquid' || this.network === 'bisq' ) {
      text = text.replace('mempoolJS();', `mempoolJS({
    ${esSpaceAdder}hostname: '${document.location.host}'
  ${esSpaceAdder}});`);
    } else {
      text = text.replace('mempoolJS();', `mempoolJS({
    ${esSpaceAdder}hostname: '${document.location.host}',
    ${esSpaceAdder}network: '${this.network}'
  ${esSpaceAdder}});`);
    }

    if( this.network === 'mainnet' || this.network === 'testnet' || this.network === 'signet' ) {
      return text.replace('%{0}', 'bitcoin');
    } else {
      text = text.replace('{ %{0}: ', '');
      if( this.network === 'liquid' ) {
        return text.replace('} = mempoolJS({', ` = liquidJS({`);
      }
      if( this.network === 'bisq' ) {
        return text.replace('} = mempoolJS({', ` = bisqJS({`);
      }
    }
    
  }

  wrapImportTemplate() {
    if( this.network === 'bisq' ) {
      return `# npm
npm install @mempool/bisq.js --save

# yarn
yarn add @mempool/bisq.js`;
    } else if( this.network === 'liquid' ) {
      return `# npm
npm install @mempool/liquid.js --save

# yarn
yarn add @mempool/liquid.js`;
    } else {
      return `# npm
npm install @mempool/mempool.js --save

# yarn
yarn add @mempool/mempool.js`;
    }
  }

  wrapEsModule() {

    let text = this.normalizeHosts( this.item.codeTemplates.esmodule.text, 'esmodule' );

    let importText = '';
    if( this.network === 'bisq') {
      importText = `import bisqJS from "@mempool/bisq.js";`;
    } else if( this.network === 'liquid' ) {
      importText = `import liquidJS from "@mempool/liquid.js";`;
    } else {
      importText = `import mempoolJS from "@mempool/mempool.js";`;
    }

    return `${importText}

const init = async () => {
  ${text}
};

init();`;
    
  }

  wrapPythonTemplate() {
    return ( ( this.network === 'testnet' || this.network === 'signet' ) ? ( this.item.codeTemplates.python.replace( "wss://mempool.space/api/v1/ws", "wss://mempool.space/" + this.network + "/api/v1/ws" ) ) : this.item.codeTemplates.python );
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

}
