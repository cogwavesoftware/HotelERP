import { OperationService } from 'src/app/_services/operation.service';

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
  selector: 'app-blockingdetails',
  templateUrl: './blockingdetails.component.html',
  styleUrls: ['./blockingdetails.component.scss']
})
export class BlockingdetailsComponent implements OnInit {
  Branch: string = "CW_1001";
  CreatedBy: number = 1;
  blockingdetailsform: FormGroup;
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
    private _oprservice:OperationService
    ) {


  }


  ngOnInit() {

 
    this.maxDate.setDate(this.minDate.getDate() + 1);
    this.blockingdetailsform = this.formBuilder.group({
      ID: ['0', Validators.required],
      Status: ['SHORT', Validators.required],
      BlockDate: [new Date(), [Validators.required]],
      BlockTime: [''],
      ReleaseDate: [this.maxDate, Validators.required],
      ReleaseTime: [],
      NoOfDays: ['0'],
      RoomNo: [this.RoomNo, Validators.required],
      RoomCode: [this.RoomCode, Validators.required],
      CreatedDate: [''],
      CreatedBy: [this.CreatedBy, Validators.required],
      Reason: ['', Validators.required],
      BranchCode: [this.Branch, Validators.required],
      ModifyBy: [this.CreatedBy],
      ModifyDate: [''],
      IpAdd: [],
      Operation:[this.Operation,Validators.required]
    });
  }



  Submit(blockingdetails: FormGroup) {

    let BlockDate = this.datePipe.transform(this.blockingdetailsform.get('BlockDate').value, "MM/dd/yyyy");
    let ReleaseDate = this.datePipe.transform(this.blockingdetailsform.get('ReleaseDate').value, "MM/dd/yyyy");
    this.blockingdetailsform.patchValue({
      BlockDate: BlockDate,
      ReleaseDate: ReleaseDate,
      RoomNo:this.RoomNo,
      RoomCode:this.RoomCode,
      Operation:this.Operation
    })
    console.log('this.blockingdetailsform.value')
    console.log(this.blockingdetailsform.value)
    this._oprservice.SaveBlockinformation(this.blockingdetailsform.value).subscribe(data => {
      if (data == true) {
        this.addToast(
          "Cogwave Software Technologies Pvt Ltd..",
          "Congratulations Data Saved Sucessfully",
          "success"
        );
       
      } 
      else {       
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
        // this.minDate=new Date();
        // this.maxDate.setDate(this.minDate.getDate() + 1);
        // this.blockingdetailsform.patchValue({
        //   BlockDate: this.minDate,
        //   ReleaseDate:this.maxDate,
        //   Status: "SHORT"
        // })
      }
    },
    error => {
     console.log(error.message)
     console.log('error.message')
      //this.blockingdetailsform.reset();
      this.addToast("Cogwave Software", error.message, "error");
      // this.minDate=new Date();
      // this.maxDate.setDate(this.minDate.getDate() + 1);
      // this.blockingdetailsform.patchValue({
      //   BlockDate: this.minDate,
      //   ReleaseDate:this.maxDate,
      //   Status: "SHORT",
      //   RoomNo:this.RoomNo,
      //   RoomCode:this.RoomCode
      // })
    },
    ()=>{
      alert('suceesss')
      this.blockingdetailsform.reset();
      this.minDate=new Date();
      this.maxDate.setDate(this.minDate.getDate() + 1);
      this.blockingdetailsform.patchValue({
        BlockDate: this.minDate,
        ReleaseDate:this.maxDate,
        Status: "SHORT"
      })
      this.closeMyModalPin(event);
    });
  }

  Selected(MName: string) {
    this.IsLongTime = !this.IsLongTime
  }

  closeMyModalPin(event){ 
    this.blockingdetailsform.reset();
    this.blockingdetailsform.patchValue({
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
