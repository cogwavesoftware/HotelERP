
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
  selector: 'app-house-guest',
  templateUrl: './house-guest.component.html',
  styleUrls: ['./house-guest.component.scss']
})
export class HouseGuestComponent implements OnInit {
  Branch: string = "CW1001";
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

  @Input('RoomCode') RoomCode: string;
  @Input('RoomNo') RoomNo: string;

  constructor(public router: Router, private datePipe: DatePipe,private toastyService: ToastyService,
    private route: ActivatedRoute, public formBuilder: FormBuilder,private _masterformservice:MasterformService
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
      RoomNo: ['', Validators.required],
      RoomCode: ['', Validators.required],
      CreatedDate: [''],
      CreatedBy: [this.CreatedBy, Validators.required],
      Reason: ['', Validators.required],
      BranchCode: [this.Branch, Validators.required],
      ModifyBy: [this.CreatedBy],
      ModifyDate: [''],
      IpAdd: []
    });
  }



  Submit(blockingdetails: FormGroup) {

    let BlockDate = this.datePipe.transform(this.blockingdetailsform.get('BlockDate').value, "MM/dd/yyyy");
    let ReleaseDate = this.datePipe.transform(this.blockingdetailsform.get('ReleaseDate').value, "MM/dd/yyyy");
    this.blockingdetailsform.patchValue({
      BlockDate: BlockDate,
      ReleaseDate: ReleaseDate
    })
    console.log(this.blockingdetailsform.value)
    this._masterformservice.SaveBlockinformation(this.blockingdetailsform.value).subscribe(data => {
      if (data == true) {
        this.addToast(
          "Cogwave Software",
          "Block Information Saved Sucessfully",
          "success"
        );
      } 
      else {
       
        this.addToast("Cogwave Software", "Block Information Not Saved", "error");
        this.minDate=new Date();
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.blockingdetailsform.patchValue({
          BlockDate: this.minDate,
          ReleaseDate:this.maxDate,
          Status: "SHORT"
        })
      }
    },
    error => {
      this.blockingdetailsform.reset();
     
      this.addToast("Cogwave Software", "Block Information Not Saved", "error");
      this.minDate=new Date();
      this.maxDate.setDate(this.minDate.getDate() + 1);
      this.blockingdetailsform.patchValue({
        BlockDate: this.minDate,
        ReleaseDate:this.maxDate,
        Status: "SHORT"
      })
    },
    ()=>{
      alert('suceesss')
    });
  }

  Selected(MName: string) {
    this.IsLongTime = !this.IsLongTime
  }
    

  Close()
  { alert('Close')
    this.blockingdetailsform.reset();
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
