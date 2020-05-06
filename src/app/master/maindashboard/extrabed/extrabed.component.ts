import { stringify } from '@angular/compiler/src/util';
import { ExtraBedFormmodel } from './../../../_models/ExtraBedFormmodel';

import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,
  Validators, NgModel
} from "@angular/forms";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { Commonmodel } from './../../../_models/Commonmodel';

@Component({
  selector: 'app-extrabed',
  templateUrl: './extrabed.component.html',
  styleUrls: ['./extrabed.component.scss']
})
export class ExtrabedComponent implements OnInit {
  // model:any;
  // @Input() RoomCode: string;
  // @Input() RoomNo: string;
  @Input() extrabedform:ExtraBedFormmodel;
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
  subpaymodelist:any;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor(  
    public router: Router,
    public formBuilder: FormBuilder,private _oprservice:OperationService,
    private toastyService: ToastyService, 
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001"    
      
     }
 

 ngOnInit() {
    this.extrabedform={
      Id: 0,
      BranchCode: "0",
      IpAdd: "0",
      CreatedBy: 0,
      RoomNo: "0",
      RoomCode: "0",
      GuestName: "0",
      NoofBed: 0,
      Tarif: 0,
      BedAmount: 0,
      TotalBedAmount: 0,
      TaxAmount: 0,
      NetAmount: 0,
      Reason: "0",
      Mode: "0",  
      }    
    }

  
    SaveExtraBedw(form?: NgForm)
    {
     
       if (form.invalid) {
        console.log(form.value);
        this.addToast("Cogwave Software", "invalid Data", "warning");
        return;
      }

    }

    CalculateTaxAmount(RoomNo:string,NoofBed:number)
    {
      this._oprservice.GetExtraBedFormData(this.Branch,RoomNo,NoofBed).subscribe(res=>{
        this.extrabedform=res;
      })
    }

    SaveExtraBed(form?: NgForm) {
      console.log('form.value')
      console.log(form.value)
      // form.value.BranchCode = localStorage.getItem("BranchCode")
      // form.value.CreatedBy = localStorage.getItem("id")
      // form.value.ModifyBy = localStorage.getItem("id")
      // form.value.IpAddress = localStorage.getItem("LOCAL_IP")
      if (form.invalid) {
        console.log(form.value);
        this.addToast("Cogwave Software", "invalid Data", "warning");
        return;
      }
  
     
      this._oprservice.SaveExtraBed(form.value).subscribe(data => {
        if (data == true) {
          if (form.value.Id == "0") {
            this.addToast(
              "Cogwave Software",
              "ExtraBed Saved Sucessfully",
              "success"
            );
          form.reset();              
          } else {
            this.addToast(
              "Cogwave Software",
              "ExtraBed Data Updated Sucessfully",
              "success"
            );
            form.reset();           
          }
        } else {
          this.addToast("Cogwave Software", "ExtraBed Data Not Saved", "error");
         
        }
      });
  
   
     
    }
    closeMyModalPin(event) { 
      var openModals = document.querySelectorAll(".md-show");
      for (let i = 0; i < openModals.length; i++) {
        openModals[i].classList.remove("md-show");
      }
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
