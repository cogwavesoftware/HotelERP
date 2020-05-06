

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

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  Branch: string = "CW1001";
  CreatedBy: number = 1;
  ReleaseForm: FormGroup;
  submitted = false;
  IsLongTime: Boolean = false;
  minDate = new Date();
  maxDate = new Date();
  Name: string = "Blocking Data";
  model: any;
  position = 'top-right';
  theme = "bootstrap";
  type = "default";
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  @Input() Operation:string;

  constructor(public router: Router, 
    private datePipe: DatePipe,private toastyService: ToastyService,
    private route: ActivatedRoute, public formBuilder: FormBuilder,
    private _masterformservice:MasterformService
    ) {


  }


  ngOnInit() {

 
    this.maxDate.setDate(this.minDate.getDate() + 1);
    this.ReleaseForm = this.formBuilder.group({
     
      
      ReleaseDate: [new Date(), [Validators.required]],
      RoomNo: [this.RoomNo, Validators.required],
      RoomCode: [this.RoomCode, Validators.required],
      StwardName:['', Validators.required],
      CreatedBy: [this.CreatedBy, Validators.required],
      Reason: ['', Validators.required],
      BranchCode: [this.Branch, Validators.required],
      ModifyBy: [this.CreatedBy],
      Operation:[this.Operation,Validators.required]
    });
  }



  Submit(blockingdetails: FormGroup) {

   
    let ReleaseDate = this.datePipe.transform(this.ReleaseForm.get('ReleaseDate').value, "MM/dd/yyyy");
    this.ReleaseForm.patchValue({
      ReleaseDate: ReleaseDate,
      RoomNo:this.RoomNo,
      RoomCode:this.RoomCode,
      Operation:this.Operation
    })
    console.log('this.ReleaseForm.value')
    console.log(this.ReleaseForm.value)
    this._masterformservice.SaveBlockinformation(this.ReleaseForm.value).subscribe(data => {
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
      //this.blockingdetailsform.reset();
      this.addToast("Cogwave Software", error.message, "error");
      
    },
    ()=>{
      alert('suceesss')
      this.ReleaseForm.reset();
      this.minDate=new Date();
      this.maxDate.setDate(this.minDate.getDate() + 1);
      this.ReleaseForm.patchValue({ 
        ReleaseDate:this.maxDate,
      })
      this.closeMyModalPin(event);
    });
  }

  Selected(MName: string) {
    this.IsLongTime = !this.IsLongTime
  }

  closeMyModalPin(event){ 
    this.ReleaseForm.reset();
    this.ReleaseForm.patchValue({
      BlockDate: this.minDate,
      ReleaseDate:this.maxDate,
      Status: "SHORT"
    })
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
