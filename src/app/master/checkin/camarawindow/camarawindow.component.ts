import { Component, OnInit, Input, OnChanges,EventEmitter,Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-camarawindow',
  templateUrl: './camarawindow.component.html',
  styleUrls: ['./camarawindow.component.scss']
})
export class CamarawindowComponent implements OnInit { 
  @Input() camImg: string;
  thumbWidth: number;
  public deviceId: string;
  error: string;
  public errors: WebcamInitError[] = [];
  @Output() ratingClicked: EventEmitter<string> =  new EventEmitter<string>();

ngOnChanges(): void { 
  this.camImg =   '/assets/images/GuestImage/CW_1001_115812658162853Front.png';
}

sendMessageToParent() {  
  this.ratingClicked.emit(` ${this.camImg} `);
}

public cameraWasSwitchedSecGuest(deviceId: string): void {
  console.log('active device: ' + deviceId);
  this.deviceId = deviceId;
}
public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
}

  constructor() { } 
  ngOnInit() {
  }

}
