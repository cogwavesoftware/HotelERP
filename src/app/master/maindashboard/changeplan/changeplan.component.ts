import { MasterformService } from './../../../_services/masterform.service';
import { ChangePlanFormmodel } from './../../../_models/ChangePlanFormmodel';
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-changeplan',
  templateUrl: './changeplan.component.html',
  styleUrls: ['./changeplan.component.scss']
})
export class ChangeplanComponent implements OnInit {
  timepicker: Partial<TimepickerConfig>;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  minDate=new Date();
  catagerys:any;
  @ViewChild('myform', {static:false}) form:any;
  @Input() changeplanformmodel :ChangePlanFormmodel
  constructor(private toastyService: ToastyService,private datePipe: DatePipe,
     private _masterformservice: MasterformService,
    private _oprservice:OperationService) { }


  ngOnInit() {
    this._masterformservice.getplan().subscribe(res => {
      this.catagerys = res;
    });


    this.changeplanformmodel={
      RoomNo:"0",
      GuestName:"0",
      BranchCode:"0",
      Plan:"0",
      CPlan:"0",
      CreatedBy:0,
    }
  }
  Submit(form?: NgForm) {

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    console.log(this.changeplanformmodel)
    console.log(form)
    
    this._oprservice.SavePlanForm(this.changeplanformmodel).subscribe(data => {
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
      //form.reset();  
      this.closeMyModalPin(event);
    });
  }

  closeMyModalPin(event){ 
    
     this.form.reset({
      CPlan: "0"
    });
    this.changeplanformmodel.CPlan="0"
    console.log( 'this.changeplanformmodel.CPlan="0"')
    console.log( this.changeplanformmodel.CPlan)
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
