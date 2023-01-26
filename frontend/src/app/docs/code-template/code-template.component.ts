import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../services/state.service';
import { restApiDocsCode } from '../api-docs/api-docs-code';

@Component({
  selector: 'app-code-template',
  templateUrl: './code-template.component.html',
  styleUrls: ['./code-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CodeTemplateComponent implements OnInit {
  @Input() hostname: string;
  @Input() item: any;
  @Input() sampleUrl: string;
  network: string;
  restDocsCode: any;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.network = ( this.stateService.network === '' ) ? 'mainnet' : this.stateService.network;
    this.restDocsCode = restApiDocsCode;
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

  getCommonJs( highlighted ) {
    let code = ( highlighted ? this.restDocsCode[this.item.fragment][this.network]['commonjsHighlighted'] : this.restDocsCode[this.item.fragment][this.network]['commonjs'] );
    return code.replace('%{DOCUMENT_LOCATION_HOST}',document.location.host).replace('%{CURRENT_NETWORK}',this.network);
  }

  getEsModule( highlighted ) {
    let code = ( highlighted ? this.restDocsCode[this.item.fragment][this.network]['esmoduleHighlighted'] : this.restDocsCode[this.item.fragment][this.network]['esmodule'] );
    return code.replace('%{DOCUMENT_LOCATION_HOST}',document.location.host).replace('%{CURRENT_NETWORK}',this.network);
  }

  getResponse( highlighted ) {
    return ( highlighted ? this.restDocsCode[this.item.fragment][this.network]['responseHighlighted'] : this.restDocsCode[this.item.fragment][this.network]['response'] );
  }

  wrapImportTemplate() {
    if( this.network === 'bisq' ) {
      return `# npm\nnpm install @mempool/bisq.js --save\n\n# yarn\nyarn add @mempool/bisq.js`;
    } else if( this.network === 'liquid' ) {
      return `# npm\nnpm install @mempool/liquid.js --save\n\n# yarn\nyarn add @mempool/liquid.js`;
    } else {
      return `# npm\nnpm install @mempool/mempool.js --save\n\n# yarn\nyarn add @mempool/mempool.js`;
    }
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
