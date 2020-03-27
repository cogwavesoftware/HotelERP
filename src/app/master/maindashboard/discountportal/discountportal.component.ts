import { OperationService } from 'src/app/_services/operation.service';

import { Component, OnInit, ViewChild, Renderer2, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { DatePipe } from "@angular/common";
import { DiscountFormmodel } from 'src/app/_models/DiscountFormmodel';
@Component({
  selector: 'app-discountportal',
  templateUrl: './discountportal.component.html',
  styleUrls: ['./discountportal.component.scss']
})
export class DiscountportalComponent implements OnInit {
  discountvalue: string[] = ["%", "Amount"];
  Branch: string;
  discountportalform: FormGroup;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  //@Input() discountform: DiscountFormmodel;
  constructor(
    public router: Router, private renderer: Renderer2,
    public formBuilder: FormBuilder,private _oprservice:OperationService,
    private route: ActivatedRoute, private datePipe: DatePipe, private toastyService: ToastyService,
    private _masterservice: MasterformService) {
   

   

  }

  ngOnInit() {
    
   
 this.discountportalform = this.formBuilder.group({
      ProcessDate: [new Date(), [Validators.required]],
      RoomNo: [this.RoomNo, Validators.required],
      RoomCode: [this.RoomCode, Validators.required],
      GuestName: ['', Validators.required],
      Disvalue: ['', Validators.required],    
      Reason: ['', Validators.required],
      DiscountType: ["0", [Validators.required]],
      BranchCode: ["0", [Validators.required]],
      CreatedBy: ["0", [Validators.required]],
    });

  }


  Submit(blockingdetails: FormGroup) {

    let prodate = this.datePipe.transform(this.discountportalform.get('ProcessDate').value, "MM/dd/yyyy");
   
    this.discountportalform.patchValue({
      ProcessDate: prodate,
      DiscountType:"0",
      BranchCode:localStorage.getItem("BranchCode"),
      CreatedBy:localStorage.getItem("Id")
    })
    this._oprservice.SaveDiscountData(this.discountportalform.value).subscribe(data => {
      if (data == true) {
        this.addToast(
          "Cogwave Software",
          "Discount Information Saved Sucessfully",
          "success");       
      }
      else {
        this.addToast("Cogwave Software", "Discount Information Not Saved", "error");
        this.minDate = new Date();
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.discountportalform.patchValue({
          ProcessDate: prodate,
      DiscountType:"0",
      BranchCode:localStorage.getItem("BranchCode"),
      CreatedBy:localStorage.getItem("Id")
          
        })
      }
    },
      error => {
        this.discountportalform.reset();
        this.addToast("Cogwave Software", "Discount Information Not Saved", "error");
        this.minDate = new Date();
        this.maxDate.setDate(this.minDate.getDate() + 1);
        this.discountportalform.patchValue({
          ProcessDate: prodate,
          DiscountType:"0",
          BranchCode:localStorage.getItem("BranchCode"),
          CreatedBy:localStorage.getItem("Id")
        })
      },
      () => {
        alert('suceesss')
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
