import { MasterformService } from 'src/app/_services/masterform.service';

import { Component, EventEmitter , OnDestroy, OnInit, Renderer2, ViewEncapsulation, ViewChild, ElementRef,Output, Input } from "@angular/core";
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';
//import { Subscription } from "rxjs/Subscription";
import { animate, style, transition, trigger } from "@angular/animations";
import { BankService } from 'src/app/_services/bank.service';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';


@Component({
  selector: 'app-camarawindow',
  templateUrl: './camarawindow.component.html',
  styleUrls: ['./camarawindow.component.scss']
})
export class CamarawindowComponent implements OnInit { 
  notshow:boolean=true;
  thumbWidth: number;
  public deviceId: string;
  error: string;
  public errors: WebcamInitError[] = [];
  base64TrimmedURL: any;
  base64DefaultURL: any;
  //web camara for SecGuest data
  SnapshotbuttonDisabledSecGuest: boolean;
  camarabuttonDisabledSecGuest: boolean;
  public snapshotshowSecGuest = false;
  public showWebcamSecGuest = false;
  public Process:string;
  GuetImg0:any; 
  GuetImg1:any; 
 
  public OnCamera: string = "OnCamera"
  public Iscamaraon: boolean = false;
  public allowCameraSwitchSecGuest = true;
  //@Input() SendIndexToChild:number; 
  private nextWebcamSecGuest: Subject<boolean | string> = new Subject<boolean | string>();
  private triggerSecGuest: Subject<void> = new Subject<void>();
  public webcamImageSecGuest: WebcamImage = null;
  @Output() ratingClicked: EventEmitter<string> =  new EventEmitter<string>();

ngOnChanges(): void { 
  //this.camImg =   '/assets/images/GuestImage/CW_1001_115812658162853Front.png';
}

sendMessageToParent() {  
  //this.ratingClicked.emit(` ${this.camImg} `);
}


public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
}

  constructor(private _bankservice:BankService,private _masterservice:MasterformService) {
    
   } 
  ngOnInit() {
    this.GuetImg0 = environment.GuestimagePath + '/imagenot1.png';
   // console.log(this.SendIndexToChild)
  }




  public SwitchOnCamaraSecGuest(index: number) {
    this.notshow = false;
    //this.GuetImg0 = environment.GuestimagePath + '/imagenot11.png';
    this.SnapshotbuttonDisabledSecGuest = false;
    this.camarabuttonDisabledSecGuest = true;

    if (this.showWebcamSecGuest) {
      this.snapshotshowSecGuest = true;
    }
    else {
      this.snapshotshowSecGuest = false;
    }
    this.showWebcamSecGuest = !this.showWebcamSecGuest;
  }



public triggerSnapshotForSecGuest(index: number): void {
  this.notshow =true;
   // this._bankservice.changeindexvalue(index);
    this.triggerSecGuest.next();
    this.toggleWebcamSecGuest();
    //this.Iscamaraon = true;
    this.SnapshotbuttonDisabledSecGuest = true;
    this.camarabuttonDisabledSecGuest = false;
  }



public toggleWebcamSecGuest(): void {
    this.showWebcamSecGuest = !this.showWebcamSecGuest;
    this.snapshotshowSecGuest = true;
  }
  public handleImageSecGuest(webcamImageSecGuest: WebcamImage): void {
   
  
   console.info('received webcam image', webcamImageSecGuest);
   this.webcamImageSecGuest = webcamImageSecGuest;
  this._bankservice.currentindex.subscribe(res => 
  {

    let indxsubcribe=res;
    this.webcamImageSecGuest = webcamImageSecGuest;
    this.GuetImg0 = webcamImageSecGuest.imageAsDataUrl
    //this.GuetImg1=webcamImageSecGuest.imageAsBase64;
   this.getImageSecGuest(webcamImageSecGuest.imageAsBase64)
  })  
  }


  getImageSecGuest(url) {
    this.Process="Please Wait"
    // Base64 url of image trimmed one without data:image/png;base64
    this.base64DefaultURL = url;
    // Naming the image
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type
    const imageName = date + '_' + text + '.png';
    // call method that creates a blob from dataUri
    //const imageBlob = this.dataURItoBlob(this.base64DefaultURL);
    const formData = new FormData();
    let imageBlob;
    this.dataURItoBlob(this.base64DefaultURL).subscribe(data => {
      imageBlob = data;
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      formData.append('GuestPohto', imageFile, imageName);
    });
    this.Process="Upload Procee 10%"
    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        this.Process="Upload Procee 50%"
      },
        error => {
          // alert('e')
          console.log(error);
          this.Process="Upload Image Failed Due to Slow Network"
        },
        () => {
          
          this.ratingClicked.emit(`${imageName}`);
          this.Process="Upload Compleated"
        });
  }


  dataURItoBlob(dataURI): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

  public showNextWebcamSecGuest(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcamSecGuest.next(directionOrDeviceId);
  }
 
  
  public cameraWasSwitchedSecGuest(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public get triggerObservableSecGuest(): Observable<void> {
    return this.triggerSecGuest.asObservable();
  }

  public get nextWebcamObservableSecGuest(): Observable<boolean | string> {
    return this.nextWebcamSecGuest.asObservable();
  }

}
