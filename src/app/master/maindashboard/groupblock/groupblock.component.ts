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
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-groupblock',
  templateUrl: './groupblock.component.html',
  styleUrls: ['./groupblock.component.scss']
})
export class GroupblockComponent implements OnInit {
  Branch: string = "CW1001";
  CreatedBy: number = 1;
  datePickerConfig: Partial<BsDatepickerConfig>;
  golbalresponse:any
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
  selectedRoomNoArrays: string[] = [];
  @Input() Groupblock: any;
  constructor(public router: Router, 
    private datePipe: DatePipe,private toastyService: ToastyService,
    private route: ActivatedRoute, public formBuilder: FormBuilder,
    private _oprservice:OperationService
    ) 
    {

  }

  ngOnInit() {

    this.maxDate.setDate(this.minDate.getDate() + 1);
    this.blockingdetailsform = this.formBuilder.group({
      ID: ['0', Validators.required],
      Status: ['SHORT', Validators.required],
      BlockDate: [new Date(), [Validators.required]],
      ReleaseDate: [this.maxDate, Validators.required],
      CreatedBy: [this.CreatedBy, Validators.required],
      Reason: ['', Validators.required],
      BranchCode: [this.Branch, Validators.required],
      Operation:['GROUPBLOCK',Validators.required],
      IpAdd: [],
    });
  }

  buttonlinlclick(event, RoomNos, RoomCodes, RoomNo) {
    debugger
    const classNameS = event.target.className;
    if (classNameS.indexOf('freeroom') >= 0) {
      document.querySelector("#" + RoomNos).classList.remove('freeroom');
      document.querySelector("#" + RoomNos).classList.add('occroom');
      this.addData(RoomNo);
    }
    else {
      document.querySelector("#" + RoomNos).classList.remove('occroom');
      document.querySelector("#" + RoomNos).classList.add('freeroom');
      this.deleteMsg(RoomNo);
    }

  }

  addData(msg: string) {
    this.selectedRoomNoArrays.push(msg);
  }
  getData() {

    return this.selectedRoomNoArrays;
  }
  deleteMsg(msg: string) {
    const index: number = this.selectedRoomNoArrays.indexOf(msg);
    if (index !== -1) {
      this.selectedRoomNoArrays.splice(index, 1);
    }
  }
  Submit(blockingdetails: FormGroup) {

    this.golbalresponse = this.getData();
    var sdata = JSON.stringify(this.golbalresponse);
    var leftstring = sdata.replace('[', '');
    var rightstr = leftstring.replace(']', '');
    console.log(rightstr);

    let BlockDate = this.datePipe.transform(this.blockingdetailsform.get('BlockDate').value, "MM/dd/yyyy");
    let ReleaseDate = this.datePipe.transform(this.blockingdetailsform.get('ReleaseDate').value, "MM/dd/yyyy");
    this.blockingdetailsform.patchValue({
      BlockDate: BlockDate,
      ReleaseDate: ReleaseDate,
      IpAdd:rightstr,
      
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
  
      }
    },
    error => {
     console.log(error.message)
     console.log('error.message')
      //this.blockingdetailsform.reset();
      this.addToast("Cogwave Software", error.message, "error");
     
    },
    ()=>{
      this.closeMyModalPin(event);
    });
  }

  Selected(MName: string) {
    this.IsLongTime = !this.IsLongTime
  }

  closeMyModalPin(event){ 
    this.blockingdetailsform.reset();
    this.minDate=new Date();
    this.maxDate.setDate(this.minDate.getDate() + 1);
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
