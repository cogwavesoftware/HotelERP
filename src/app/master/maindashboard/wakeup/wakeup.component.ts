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
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ConfirmationDialogService } from './../../../_services/confirmation-dialog.service';
@Component({
  selector: 'app-wakeup',
  templateUrl: './wakeup.component.html',
  styleUrls: ['./wakeup.component.scss']
})
export class WakeupComponent implements OnInit {
  // Branch: string = "CW1001";
  // CreatedBy: number = 1;
  wakeupform: FormGroup;
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
  @Input() BranchCode: string;
  @Input() UserId: string;
  valid: boolean = true;
  myTime = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  isValid(event: boolean): void {
    this.valid = event;
  }


  constructor(public router: Router, private datePipe: DatePipe,
    private toastyService: ToastyService,private confirmationDialogService:ConfirmationDialogService,
    private route: ActivatedRoute, public formBuilder: FormBuilder,
    private _oprservice:OperationService
    ) {

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


        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.wakeupform = this.formBuilder.group({
          alarmdate: [new Date(), [Validators.required]],
          alarmtime: [this.myTime],
          RoomNo: ['', Validators.required],
          RoomCode: ['', Validators.required],
          CreatedBy: [this.UserId, Validators.required],
          Reason: ['', Validators.required],
          BranchCode: [this.BranchCode, Validators.required],
        });
    
  }

  ngOnInit() {

  
  }
 

  offAlarm(form:any)
  {
    console.log('offAlarm')
    console.log(form)
  }

  Submit(wakeupform: FormGroup) {
    this.confirmationDialogService.confirm('Please confirm ..', 'Do you really want to Change Guest ... ?')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed)
      if (confirmed === true) {
        let BlockDate = this.datePipe.transform(this.wakeupform.get('alarmdate').value, "MM/dd/yyyy");
        this.wakeupform.patchValue({
          RoomNo:this.RoomNo,
          RoomCode:this.RoomCode,
          CreatedBy:this.UserId,
          BranchCode:this.BranchCode
    
        })
        console.log(this.wakeupform.value)
        this._oprservice.SaveWakeupformation(this.wakeupform.value).subscribe(data => {
          if (data == true) {
            this.addToast(
              "Cogwave Software",
              "Block Information Saved Sucessfully",
              "success"
            );
          } 
          else {
            this.addToast("Cogwave Software", "Block Information Not Saved", "error");  
          }
        },
        error => {
          //this.wakeupform.reset();
          this.addToast("Cogwave Software", "Block Information Not Saved", "error");
          // this.minDate=new Date();
          // this.maxDate.setDate(this.minDate.getDate() + 1);
          // this.wakeupform.patchValue({
          //   alarmdate: this.minDate,
          //   alarmtime:this.myTime
          // })
        },
        ()=>{
          this.closeMyModalPin(event);
        });
      }//confoirmtrue end
      else {
        return;
      }
    })
    .catch(() => {
      alert('cach')
      console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
    });

  
  }


  closeMyModalPin(event){ 
    this.wakeupform.reset();
      this.minDate=new Date();
      this.maxDate.setDate(this.minDate.getDate() + 1);
      this.wakeupform.patchValue({
        alarmdate: this.minDate,
        alarmtime:this.myTime,
        Reason:'',
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
