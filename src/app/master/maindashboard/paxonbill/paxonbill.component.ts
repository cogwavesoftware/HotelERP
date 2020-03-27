import { PaxonBillmodel } from './../../../_models/PaxonBillmodel';

import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';

@Component({
  selector: 'app-paxonbill',
  templateUrl: './paxonbill.component.html',
  styleUrls: ['./paxonbill.component.scss']
})
export class PaxonbillComponent implements OnInit {

  Branch: string;
  @Input() paxonbillform:PaxonBillmodel;
  submitted = false;
  subpaymodelist:any;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
 
  constructor(public router: Router,
    private _oprservice:OperationService,
    private toastyService: ToastyService, 
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {}
    
  ngOnInit() {

    this.paxonbillform={
      RoomNo:"0",
      RoomCode:"0",
      Pax:0,
      BranchCode:"0",
      IpAdd:"0",
      CreatedBy:0
    }

  }
  SavePaxOnBill(form?: NgForm) {

    console.log('form.value')
    console.log(form.value)
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

   
    this._oprservice.SavePaxOnBil(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "PaxonBill Saved Sucessfully",
            "success"
          );
        form.reset();              
        } else {
          this.addToast(
            "Cogwave Software",
            "PaxonBill Data Updated Sucessfully",
            "success"
          );
          form.reset();           
        }
      } else {
        this.addToast("Cogwave Software", "PaxonBill Data Not Saved", "error");
       
      }
    });

 
   
  }

  addToast(title, Message, theme) {
    debugger;
    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 3000,
      theme: theme,
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
        // this.router.navigate(['/dashboard/default']);
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (theme) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        debugger;
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}
