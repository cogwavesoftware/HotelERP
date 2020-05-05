import { OperationService } from 'src/app/_services/operation.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Roominstructionmodel } from 'src/app/_models/Roominstructionmodel';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-roominstruction',
  templateUrl: './roominstruction.component.html',
  styleUrls: ['./roominstruction.component.scss']
})
export class RoominstructionComponent implements OnInit {
@Input() RoomInstruction:Roominstructionmodel;
model:any;
 theme = "bootstrap";
datePickerConfig: Partial<BsDatepickerConfig>;
 type = "default";
 position = 'top-right';
 minDate=new Date();
 @ViewChild('myform',{static:false}) form:any;
  constructor(private toastyService: ToastyService,private _oprservice:OperationService
 
    ) { }

  ngOnInit() {
    this.RoomInstruction={
      Id:"0",
      BranchCode:"0",
      special:[],
      CreatedBy:0,
      RoomNo:"0",
      ProcessDate:this.minDate,
      RoomCode:"0", 
    }    
  }
  closeMyModalPin(event){ 
    this.form.reset();  
    //this.changeplanformmodel.CPlan="0"
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
    var maindashboard = document.querySelectorAll(".maindashboard"); 
  }

  Saveinstruction(form?: NgForm) {
    console.log('form.value')
    console.log(this.RoomInstruction)
   debugger;
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

   
    this._oprservice.SaveRoomInstruction(this.RoomInstruction).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Guest Instruction Saved Sucessfully",
            "success"
          );
        form.reset();              
        } else {
          this.addToast(
            "Cogwave Software",
            "Guest Instruction Data Updated Sucessfully",
            "success"
          );
          form.reset();           
        }
      } else {
        this.addToast("Cogwave Software", "Guest Instruction Data Not Saved", "error");      
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
