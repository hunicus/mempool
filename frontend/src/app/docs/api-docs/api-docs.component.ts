import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Env, StateService } from '../../services/state.service';
import { Observable, merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { faqData, restApiDocsData, wsApiDocsData } from './api-docs-data';

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss']
})
export class ApiDocsComponent implements OnInit {
  hostname = document.location.hostname;
  network$: Observable<string>;
  active = 0;
  env: Env;
  code: any;
  baseNetworkUrl = '';
  @Input() whichTab: string;
  desktopDocsNavPosition = "relative";
  faq: any[];
  restDocs: any[];
  wsDocs: any;
  screenWidth: number;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    const that = this;
    setTimeout( () => {
      if( this.route.snapshot.fragment ) {
        this.openEndpointContainer( this.route.snapshot.fragment );
      }
      window.addEventListener('scroll', function() {
        that.desktopDocsNavPosition = ( window.pageYOffset > 182 ) ? "fixed" : "relative";
      }, { passive: true} );

      //make links coming from api-docs-data.ts open without reloading spa
      document.querySelector('body').onclick = function( event: any ) {
        if( event.target.className === "link-from-data-file" ) {
          event.preventDefault();
          const link = event.target.attributes.href.value;
          if( link.indexOf( "#" ) < 0 ) {
            that.router.navigate( [ that.baseNetworkUrl + link ] );
          } else {
            const path = that.baseNetworkUrl + link.substring( 0, link.indexOf("#") );
            const fragment = link.substring( link.indexOf("#") + 1 );
            that.router.navigate( [ path ], { fragment: fragment } );
            setTimeout( () => {
              document.getElementById( fragment ).scrollIntoView();
            }, 1 );
          }
        }
      };

    }, 1 );
  }

  ngOnInit(): void {
    this.env = this.stateService.env;
    this.network$ = merge(of(''), this.stateService.networkChanged$).pipe(
      tap((network: string) => {
        if (this.env.BASE_MODULE === 'mempool' && network !== '') {
          this.baseNetworkUrl = `/${network}`;
        } else if (this.env.BASE_MODULE === 'liquid') {
          if (!['', 'liquid'].includes(network)) {
            this.baseNetworkUrl = `/${network}`;
          }
        }
        return network;
      })
    );

    if (document.location.port !== '') {
      this.hostname = `${this.hostname}:${document.location.port}`;
    }

    this.hostname = `${document.location.protocol}//${this.hostname}`;

    this.faq = faqData;
    this.restDocs = restApiDocsData;
    this.wsDocs = wsApiDocsData;

    this.network$.subscribe((network) => {
      this.active = (network === 'liquid' || network === 'liquidtestnet') ? 2 : 0;
    });
  }

  ngOnDestroy(): void {
    document.querySelector('body').onclick = null;
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
    document.getElementById( targetId ).scrollIntoView();
    this.openEndpointContainer( targetId );
  }

  openEndpointContainer( targetId ) {
    const tabHeaderHeight = document.getElementById( targetId + "-tab-header" ).scrollHeight;
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

  wrapUrl(network: string, code: any, websocket: boolean = false) {

    let curlResponse = [];
    if (['', 'mainnet'].includes(network)){
      curlResponse = code.codeSampleMainnet.curl;
    }
    if (network === 'testnet') {
      curlResponse = code.codeSampleTestnet.curl;
    }
    if (network === 'signet') {
      curlResponse = code.codeSampleSignet.curl;
    }
    if (network === 'liquid') {
      curlResponse = code.codeSampleLiquid.curl;
    }
    if (network === 'liquidtestnet') {
      curlResponse = code.codeSampleLiquidTestnet.curl;
    }
    if (network === 'bisq') {
      curlResponse = code.codeSampleBisq.curl;
    }

    let curlNetwork = '';
    if (this.env.BASE_MODULE === 'mempool') {
      if (!['', 'mainnet'].includes(network)) {
        curlNetwork = `/${network}`;
      }
    } else if (this.env.BASE_MODULE === 'liquid') {
      if (!['', 'liquid'].includes(network)) {
        curlNetwork = `/${network}`;
      }
    }

    let text = code.codeTemplate.curl;
    for (let index = 0; index < curlResponse.length; index++) {
      const curlText = curlResponse[index];
      const indexNumber = index + 1;
      text = text.replace('%{' + indexNumber + '}', curlText);
    }

    if (websocket) {
      const wsHostname = this.hostname.replace('https://', 'wss://');
      wsHostname.replace('http://', 'ws://');
      return `${wsHostname}${curlNetwork}${text}`;
    }
    return `${this.hostname}${curlNetwork}${text}`;
  }

}

