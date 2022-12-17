import { Component, OnInit, Input, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { Env, StateService } from '../../services/state.service';
import { Observable, merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { faqData, restApiDocsData, wsApiDocsData } from './api-docs-data';
import { FaqTemplateDirective } from '../faq-template/faq-template.component';
import { PassThrough } from 'stream';

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss']
})
export class ApiDocsComponent implements OnInit, AfterViewInit {
  @Input() whichTab: string;
  hostname: string = document.location.hostname;
  electrsPort: number = 0;
  network: string = '';
  env: Env;
  code: any;
  desktopDocsNavPosition: string = "relative";
  faq: any[];
  restDocs: any[];
  wsDocs: any;
  screenWidth: number;
  officialMempoolInstance: boolean;
  networks: string[] = ["mainnet", "testnet", "signet", "liquid", "liquidtestnet", "bisq"];

  @ViewChildren(FaqTemplateDirective) faqTemplates: QueryList<FaqTemplateDirective>;
  dict = {};

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
  ) { }

  ngAfterContentChecked() {
    if (this.faqTemplates) {
      this.faqTemplates.forEach((x) => this.dict[x.type] = x.template);
    }
    this.desktopDocsNavPosition = ( window.pageYOffset > 182 ) ? "fixed" : "relative";
  }

  ngAfterViewInit() {
    const that = this;
    setTimeout( () => {
      if( this.route.snapshot.fragment ) {
        this.openEndpointContainer( this.route.snapshot.fragment );
        if (document.getElementById( this.route.snapshot.fragment )) {
          document.getElementById( this.route.snapshot.fragment ).scrollIntoView();
        }
      }
      window.addEventListener('scroll', that.onDocScroll, { passive: true });
    }, 1 );
  }

  ngOnInit(): void {
    this.env = this.stateService.env;
    this.network = ( this.stateService.network === '' ) ? 'mainnet' : this.stateService.network;

    this.faq = faqData;
    this.restDocs = restApiDocsData;
    this.wsDocs = wsApiDocsData;
   
    switch( this.network ) {
      case "mainnet":
        this.electrsPort = 50002; break;
      case "testnet":
        this.electrsPort = 60002; break;
      case "signet":
        this.electrsPort = 60602; break;
      case "liquid":
        this.electrsPort = 51002; break;
      case "liquidtestnet":
        this.electrsPort = 51302; break;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onDocScroll);
  }

  onDocScroll() {
    this.desktopDocsNavPosition = ( window.pageYOffset > 182 ) ? "fixed" : "relative";
  }

  anchorLinkClick( event: any ) {
    let targetId = "";
    if( event.target.nodeName === "A" ) {
      targetId = event.target.hash.substring(1);
    } else {
      let element = event.target;
      while( element.nodeName !== "A" ) {
        element = element.parentElement;
      }
      targetId = element.hash.substring(1);
    }
    if( this.route.snapshot.fragment === targetId && document.getElementById( targetId )) {
      document.getElementById( targetId ).scrollIntoView();
    }
    this.openEndpointContainer( targetId );
  }

  openEndpointContainer( targetId ) {
    let tabHeaderHeight = 0;
    if (document.getElementById( targetId + "-tab-header" )) {
      tabHeaderHeight = document.getElementById( targetId + "-tab-header" ).scrollHeight;
    }
    if( ( window.innerWidth <= 992 ) && ( ( this.whichTab === 'rest' ) || ( this.whichTab === 'faq' ) ) && targetId ) {
      const endpointContainerEl = document.querySelector<HTMLElement>( "#" + targetId );
      const endpointContentEl = document.querySelector<HTMLElement>( "#" + targetId + " .endpoint-content" );
      const endPointContentElHeight = endpointContentEl.clientHeight;

      if( endpointContentEl.classList.contains( "open" ) ) {
        endpointContainerEl.style.height = "auto";
        endpointContentEl.style.top = "-10000px";
        endpointContentEl.style.opacity = "0";
        endpointContentEl.classList.remove( "open" );
      } else {
        endpointContainerEl.style.height = endPointContentElHeight + tabHeaderHeight + 28 + "px";
        endpointContentEl.style.top = tabHeaderHeight + 28 + "px";
        endpointContentEl.style.opacity = "1";
        endpointContentEl.classList.add( "open" );
      }
    }
  }

  getSampleUrl( item, forDisplay ) {
    const mergedItem = this.getMergedItem( item );
    if( this.network === 'mainnet' || this.network === 'liquid' || this.network === 'bisq' ) {
      return ( forDisplay ? `/api${mergedItem.codeTemplates.curl.textDisplay}` : `${document.location.protocol}//${document.location.host}/api${mergedItem.codeTemplates.curl.text}` );
    } else {
      return ( forDisplay ? `/${this.network}/api${mergedItem.codeTemplates.curl.textDisplay}` : `${document.location.protocol}//${document.location.host}/${this.network}/api${mergedItem.codeTemplates.curl.text}` );
    }
  }

  getEndpointDescription( item ) {
    const mergedItem = this.getMergedItem( item );
    return mergedItem.description;
  }

  /*wrapUrl(network: string, code: any, websocket: boolean = false) {

    let text = code.codeTemplate.curl;
    for (let index = 0; index < curlResponse.length; index++) {
      const curlText = curlResponse[index];
      const indexNumber = index + 1;
      text = text.replace('%{' + indexNumber + '}', curlText);
    }

    if (websocket) {
      const wsHostname = document.location.hostname.replace('https://', 'wss://');
      wsHostname.replace('http://', 'ws://');
      return `${wsHostname}${curlNetwork}${text}`;
    }
    return `${document.location.hostname}${curlNetwork}${text}`;
  }*/

  //enables selective overriding for network-specific attributes
  getMergedItem( item: any ) {
    let merged: any = {};
    Object.assign( merged, item );
    this.networks.forEach( n => delete merged[n] );
    if( item.hasOwnProperty( this.network ) ) {
      for( let k1 in item[ this.network ] ) {
        if( item[ this.network ].hasOwnProperty(k1) ) {
          if( k1 == 'codeTemplates' ) {
            for( let k2 in item[ this.network ]['codeTemplates'] ) {
              merged['codeTemplates'][k2] = item[ this.network ][k1][k2];  
            }
          } else {
            merged[k1] = item[ this.network ][k1];
          }
        }
      }
    }
    merged.codeTemplates = this.processParameters( merged );
    return merged;
  }

  processParameters( merged: any ) {
    for( let k in merged.codeTemplates ) {
      if( merged['codeTemplates'][k].hasOwnProperty('template') ) {
        if( k === 'curl' ) {
          merged.codeTemplates[k]['textDisplay'] = ( merged.parameters.labels.length > 0 ? this.insertParameters( merged.codeTemplates[k]['template'], merged.parameters.labels, true ) : merged.codeTemplates[k].template );
        }
        merged.codeTemplates[k]['text'] = ( merged.parameters.exampleValues.length > 0 ? this.insertParameters( merged.codeTemplates[k]['template'], merged.parameters.exampleValues, false ) : merged.codeTemplates[k].template );
      }
    }
    return merged.codeTemplates;
  }

  insertParameters( templateText, parameters, isDisplay ) {
    for( let i = 0; i < parameters.length; i++ ) {
      templateText = templateText.replace( '%{' + (i+1) + '}', ( isDisplay ? ":" : "" ) + parameters[i] );
    }
    return templateText;
  }

}