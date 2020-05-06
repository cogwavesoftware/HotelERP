
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';

import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { Commonmodel } from './../../../_models/Commonmodel';
import { EditPaxRateFormmodel } from 'src/app/_models/EditPaxRateFormmodel';
import { AmendRoommodel } from './../../../_models/AmendRoommodel';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-amend-date',
  templateUrl: './amend-date.component.html',
  styleUrls: ['./amend-date.component.scss']
})
export class AmendDateComponent implements OnInit {
  timepicker: Partial<TimepickerConfig>;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  minDate=new Date();
  @Input() amendformdata :AmendRoommodel
  valid: boolean = true;
  myTime = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  isValid(event: boolean): void {
    this.valid = event;
  }
  constructor(private toastyService: ToastyService,private datePipe: DatePipe,
    private _oprservice:OperationService)
  {
      this.timepicker = Object.assign({},
        {
          hourStep: 2,  
          minuteStep: 10,
          showMeridian: false,
          // readonlyInput: false,
          mousewheel: true,
          showMinutes: true,
          showSeconds: false,
          // arrowkeys:true
        });
      }


  ngOnInit() {
  
    this.amendformdata={
      RoomNo:"0",
      GuestName:"0",
      AmendTime:this.myTime,
      CheckoutDate:new Date(),
      AmendDate:new Date(),     
      Reason:"AMEND DATE",
      BranchCode:"0",
      IpAdd:"0",
      CreatedBy:0,
    }
  }
  
  SaveAmend(form?: NgForm) {
    debugger;
    console.log('form.value')
    console.log(form.value)
    // if (form.invalid) {
    //   alert('f')
    //   console.log(form.value);
    //   this.addToast("Cogwave Software", "invalid Data", "warning");
    //   return;
    // } 
    alert('tru')
    this._oprservice.SaveAmend(this.amendformdata).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Amend Data Saved Sucessfully",
            "success"
          );
        form.reset();              
        } else {
          this.addToast(
            "Cogwave Software",
            "Amend Data  Updated Sucessfully",
            "success"
          );
          form.reset();           
        }
      } else {
        this.addToast("Cogwave Software", "Amend Data  Not Saved", "error");      
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
