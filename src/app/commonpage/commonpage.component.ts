import { AddressService } from './../_services/address.service';

import { Observable } from 'rxjs/observable';

import { Component, OnInit,NgZone } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
// import {TranslateService } from '@ngx-translate/core';
import { TreeviewItemService } from '../shared/service/treeview-item.service';
import { TreeviewItem, TreeviewConfig } from '../shared/service/lib';
import { MasterformService } from './../_services/masterform.service';
declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}


@Component({
  selector: 'app-commonpage',
  templateUrl: './commonpage.component.html',
  styleUrls: ['./commonpage.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class CommonpageComponent implements OnInit {



  public data:Observable<any>;
  items: TreeviewItem[];
  ipAddress:any;
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  localIp = sessionStorage.getItem('LOCAL_IP');

  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  constructor(private _authservice:AuthenticationService,private zone: NgZone,
    private http: HttpClient,private service: TreeviewItemService,private adreeservice:AddressService,
    public _masterservice:MasterformService) {



  // this.http.get<{ip:string}>('https://jsonip.com')
  // .subscribe( data => {
  //   console.log('th data', data);
  //   localStorage.removeItem('LOCAL_IP');
  //   this.ipAddress= localStorage.setItem('LOCAL_IP', data.ip)
    

  //  })


  this.ipAddress= localStorage.setItem('LOCAL_IP', '192.168.0.1')

   // translate.addLangs(['en','fr','ta','zh']);
    //translate.setDefaultLang('fr');
    // const browserLang=translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang :'en')

    this.navType = 'st2';
    this.themeLayout = 'vertical';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light';

    this.headerTheme = 'theme1';
    this.pcodedHeaderPosition = 'fixed';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.windowWidth = window.innerWidth;
    this.setHeaderAttributes(this.windowWidth);
  }

  ngOnInit() {
    
  this._authservice.logout();
  //this.determineLocalIp();

   this._masterservice.GetPinAddress().subscribe(res=>{
    this.data =res;
    //console.log(this.data)
    this.adreeservice.SetMessages(this.data)
   });
  
    
  }

  private determineLocalIp() {
    window.RTCPeerConnection = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }
        this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
        alert(this.localIp)
        localStorage.removeItem('LOCAL_IP');
        localStorage.setItem('LOCAL_IP', this.localIp)
        pc.onicecandidate = () => {};
        pc.close();
      });
    };
  }
  private getRTCPeerConnection() {
    return window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
  }
  
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth < 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  toggleHeaderNavRight() 
  {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
  }

  toggleLiveNotification() {
    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'active' : '';
  }

  toggleProfileNotification() {
    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'active' : '';
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    const searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    const searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

}

