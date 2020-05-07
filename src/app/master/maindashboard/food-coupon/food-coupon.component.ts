import { MasterformService } from './../../../_services/masterform.service';
import { Foodcouponmodel } from './../../../_models/Foodcouponmodel';
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-food-coupon',
  templateUrl: './food-coupon.component.html',
  styleUrls: ['./food-coupon.component.scss']
})
export class FoodCouponComponent implements OnInit {
  theme = "bootstrap";
  datePickerConfig: Partial<BsDatepickerConfig>;
  type = "default";
  position = 'top-right';
  minDate=new Date();
  catagerys:any;
  @ViewChild('myform', {static:false}) form:any;
  @Input() Foodcouponmodel :Foodcouponmodel
  constructor(private toastyService: ToastyService,private datePipe: DatePipe,
    private _masterformservice: MasterformService,private _oprservice:OperationService) { }
  ngOnInit() {
    this.Foodcouponmodel={
      RoomNo:"0",
      GuestName:"0",
      BranchCode:"0",
      Plan:"0",
      RoomCode:"0",
      ProcessDate:this.minDate,
      CreatedBy:0,
    }
  }

  Submit(form?: NgForm) {

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    console.log(this.Foodcouponmodel)
    console.log(form)
    
    this._oprservice.SaveFoodCoupon(this.Foodcouponmodel).subscribe(data => {
      if (data == true) {
        this.addToast(
          "Cogwave Software Technologies Pvt Ltd..",
          "Congratulations Data Saved Sucessfully",
          "success"
        );
      } 
      else {       
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");  
      }
    },
    error => {
     console.log(error.message)
     console.log('error.message')
      this.addToast("Cogwave Software", error.message, "error");
    },
    ()=>{
      alert('suceesss')
      form.reset();
     
      this.closeMyModalPin(event);
    });
  }

  closeMyModalPin(event){ 
    this.form.reset();  
    this.Foodcouponmodel.ProcessDate=new Date();
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
    var maindashboard = document.querySelectorAll(".maindashboard"); 
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
