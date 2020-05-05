
import { OperationService } from 'src/app/_services/operation.service';
import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { DatePipe } from "@angular/common";
import { DiscountFormmodel } from 'src/app/_models/DiscountFormmodel';
@Component({
  selector: 'app-houseguest',
  templateUrl: './houseguest.component.html',
  styleUrls: ['./houseguest.component.scss']
})
export class HouseguestComponent implements OnInit {
  @Input () RoomNo:string
  @Input () RoomCode:string
  isRemoveHouse:boolean;
  Branch:string;
  UserId:string;
  model:any;
  constructor(private toastyService: ToastyService,private _oprservice:OperationService) {

   }

  ngOnInit() {
    this.Branch=localStorage.getItem('BranchCode')
    this.UserId=localStorage.getItem('id');
    this.model={
      BranchCode:this.Branch,
      CreatedBy:this.UserId,
      RoomNos:this.RoomNo,
      RoomCodes:this.RoomCode,
      tarif:0,
      status:"HOUSE",     
    }    
  }
  closeMyModalPin(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

  Selected(MName: string) {
    if(MName=="House")
    {
      this.isRemoveHouse = false
    }
    else{
      this.isRemoveHouse = true;
    }
    
  }

  

  SaveHouseGuest(form?: NgForm) {

     
     form.value.RoomCodes = this.RoomCode
     form.value.RoomNos= this.RoomNo
     console.log(form.value)


     this._oprservice.CheckHouseHuest(this.Branch,this.RoomNo).subscribe(res=>{
       
     })


     return;
    this._oprservice.SaveHouseGuest(form.value).subscribe(data => {
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
        // console.log('Toast ' + toast.id + ' has been added!');
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
