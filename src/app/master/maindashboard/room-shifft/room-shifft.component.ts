import { NgForm } from '@angular/forms';
import { OperationService } from 'src/app/_services/operation.service';

import { RoomShifftFormmodel } from './../../../_models/RoomShifftFormmodel';
import { Component, OnInit, Input } from '@angular/core';





import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { format } from 'url';
@Component({
  selector: 'app-room-shifft',
  templateUrl: './room-shifft.component.html',
  styleUrls: ['./room-shifft.component.scss']
})
export class RoomShifftComponent implements OnInit {
model:any;
theme = "bootstrap";
Typelist:any;
 type = "default";
 position = 'top-right';
  @Input() roomshifftformmodel :RoomShifftFormmodel
  constructor(private toastyService: ToastyService,private _oprservice:OperationService ) { }

  ngOnInit() {
    this.roomshifftformmodel={
    Id:0,
    BranchCode:"0",
    IpAdd:"0",
    CreatedBy:0,
    CRoomNo:"0",
    CRoomCode:"0",
    SRoomNo:"0",
    SRoomCode:"0",
    GuestName:"0",
    Tariff:0,    
    Tax:0,
    NetAmount:0,
    Reason:"0",
    Mode:"0"
    }    
  }

  LoadType(RoomNo:string )
  {
    this._oprservice.GetRoomTypeViaRoomNo(this.roomshifftformmodel.BranchCode,RoomNo).subscribe(data => {
             this.Typelist=data;
    })
  }

  SaveRoomShift(form?: NgForm) {
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

   
    this._oprservice.SaveRoomShifft(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "RoomShift Saved Sucessfully",
            "success"
          );
        form.reset();              
        } else {
          this.addToast(
            "Cogwave Software",
            "RoomShift Data Updated Sucessfully",
            "success"
          );
          form.reset();           
        }
      } else {
        this.addToast("Cogwave Software", "RoomShift Data Not Saved", "error");
       
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


  closeMyModal(event,form?:NgForm){  
    form.resetForm();
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }
}
