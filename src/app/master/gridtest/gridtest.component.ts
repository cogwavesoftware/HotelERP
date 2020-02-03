
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from "./../../_services/masterform.service";

import { IpserviceService } from "src/app/_services/ipservice.service";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gridtest',
  templateUrl: './gridtest.component.html',
  styleUrls: ['./gridtest.component.scss'],
})


export class GridtestComponent implements OnInit {
  public OnCamera: string = "OnCamera"
  public Iscamaraon: boolean = false;
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}

 

  // getBase64Image(img: HTMLImageElement) {
  //   debugger;
  //   // We create a HTML canvas object that will create a 2d image
  //   var canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   var ctx = canvas.getContext("2d");
  //   // This will draw image    
  //   ctx.drawImage(img, 0, 0);
  //   // Convert the drawn image to Data URL
  //   var dataURL = canvas.toDataURL("image/png");
  //   this.base64DefaultURL = dataURL;
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }







  // getBase64ImageFromURL(url: string) {
  //   debugger;
  //   return Observable.create((observer: Observer<string>) => {
  //     // create an image object
  //     let img = new Image();
  //     img.crossOrigin = 'Anonymous';
  //     img.src = url;
  //     if (!img.complete) {
  //       // This will call another method that will create image from url
  //       img.onload = () => {
  //         observer.next(this.getBase64Image(img));
  //         observer.complete();
  //       };
  //       img.onerror = (err) => {
  //         observer.error(err);
  //       };
  //     } else {
  //       observer.next(this.getBase64Image(img));
  //       observer.complete();
  //     }
  //   });
  // }



