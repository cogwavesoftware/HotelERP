
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { Commonmodel } from './../../../_models/Commonmodel';
import { EditPaxRateFormmodel } from 'src/app/_models/EditPaxRateFormmodel';


@Component({
  selector: 'app-changepax',
  templateUrl: './changepax.component.html',
  styleUrls: ['./changepax.component.scss']
})
export class ChangepaxComponent implements OnInit {
  
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  @Input() changepaxform :EditPaxRateFormmodel
  constructor(private toastyService: ToastyService, private _oprservice:OperationService) { }

  ngOnInit() {

    this.changepaxform={
      RoomNo:"0",
      RoomCode:"0",
      GuestName:"0",
      Pax:0,
      ActualRate:0,
      OfferRate:0,
      Tax:0,
      NetAmount:0,
      Reason:"Change Pax",
      Mode:"Change",
      Id:0,
      BranchCode:"0",
      IpAdd:"0",
      CreatedBy:0,
    }
  }

  SaveChangePax(form?: NgForm) {
    console.log('form.value')
    console.log(form.value)
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._oprservice.SaveEditPax(form.value).subscribe(data => {
      if (data == true) {
          this.addToast( "Cogwave Software","Edit Pax Saved Sucessfully","success" );             
      } 
      else
       {
        this.addToast("Cogwave Software", "Edit Pax Data Not Saved", "error");      
      }
    },
    error=>{
      this.addToast("Cogwave Software", error, "error");
    },
    ()=>{
      this.closeMyModalPin(event,form);
    });   
  }

  GetTarrif(pax:number)
  {
    this._oprservice.GetTarrif(this.changepaxform.RoomCode, pax,this.changepaxform.BranchCode).subscribe(data=>{
      this.changepaxform.OfferRate=data;
      this.changepaxform.ActualRate=data;
    })
  }
  closeMyModalPin(event,form?:NgForm) {
   
    form.resetForm();
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
