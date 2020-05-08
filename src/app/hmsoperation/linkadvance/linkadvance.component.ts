import { MasterformService } from 'src/app/_services/masterform.service';

import { Component, Input, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { ReservationService } from './../../_services/reservation.service';
import { Observable, empty } from 'rxjs';
import { NgForm } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { OperationService } from 'src/app/_services/operation.service';


@Component({
  selector: 'app-linkadvance',
  templateUrl: './linkadvance.component.html',
  styleUrls: ['./linkadvance.component.scss']
})
export class LinkadvanceComponent implements OnInit {
  BookingList:any;
  roomlist:any=[];
  linkadvance:any;
  isValid: boolean;
  TotalBillAmount: number;
  
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  subpaymodelist:any;
  form: FormGroup;
  Show: boolean;
  UserId:string="1";
  Branch:string="CW_1001";
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor(public _reservationservice:ReservationService,private _masterservice:MasterformService,
    public formBuilder: FormBuilder, public _oprservice: OperationService) {
     
    this.form = this.formBuilder.group({
      ReceiptNo: ["0", [Validators.required]],
      BranchCode: [this.Branch, [Validators.required]],
      ModifyBy: [this.UserId, [Validators.required]],
      PayArray: this.formBuilder.array([]),
      RoomNo:["0", [Validators.required]],
    });
   }


  ngOnInit() {
  this.Show = false;
  this._reservationservice.GetBookingList("CW_1001").subscribe(data => {
  this.BookingList = data;
  console.log(this.BookingList)
  });

  }

  Submit()
  {
    console.log(this.form.value)
  }
  LoadReservationCheckinpage(BookingNo)
  {
    this.Show = true;
    this.form = this.formBuilder.group({
      ReceiptNo: [BookingNo, [Validators.required]],
      BranchCode: [this.Branch, [Validators.required]],
      ModifyBy: [this.UserId, [Validators.required]],
      PayArray: this.formBuilder.array([]),
      RoomNo:["0", [Validators.required]],
    });
    this._masterservice.GetAllRoomNoViaMode(this.Branch,"O").subscribe(res=>{
      this.roomlist=res;
      console.log(this.roomlist)
    })
    this._oprservice.GetAdvanceDetailByBookingNo(this.Branch,BookingNo).subscribe(res=>{
      let ResAdvance=res;
      if (ResAdvance != null) {
        ResAdvance.forEach(res => {
          if (res.CashAmount > 0) {
            this.GetPaymentDetails(res.CashMode, res.CashSubMode, res.CashDescription, res.CashAmount)
          }
          if (res.CardAmount > 0) {
            this.GetPaymentDetails(res.CardMode, res.CardSubMode, res.CardDescription, res.CardAmount)
          }
          if (res.ChequeAmount > 0) {
            this.GetPaymentDetails(res.ChequeMode, res.ChequeSubMode, res.ChequeDescription, res.ChequeAmount)
          }
          if (res.OnlineAmount > 0) {
            this.GetPaymentDetails(res.OnlineMode, res.OnlineSubMode, res.OnlineDescription, res.OnlineAmount)
          }
          if (res.WaletAmount > 0) {
            this.GetPaymentDetails(res.WaletMode, res.WaletSubMode, res.WaletDescription, res.WaletAmount)
          }
        });
        this.CalculateSummaryAmount();
      }
    })

   
  }
  CalculateSummaryAmount() {

    this.TotalBillAmount=0;
    
      for (let Payarray of this.PayArray.controls) {
        this.TotalBillAmount += Payarray.get("payAmount").value;
      }
     
    }
  GetsubModepayment(Name: string, index: number) {
    this._masterservice.GetAllSubPaymendModeViaMode("CW_1001", Name).subscribe(res => {
      this.subpaymodelist = res
    })
  }
  PatchSubModeName(index: number) {
    let DescriptionMode = this.PayArray.controls[index].get("Paysubmode").value;
    this.PayArray.controls[index].patchValue({
      modeselected: DescriptionMode
    })
    this.PayArray.controls[index].get("modeselected").disable({ onlySelf: true });
  }
  CloseFormmodel()
  {
    this.Show=!this.Show
  }
  AddpaymentGrid(): FormGroup {
    return this.formBuilder.group({
      Paymode: ["select"],
      Paysubmode: ["select", [Validators.required]],
      payAmount: [0, [Validators.required]],
      Descriptions: ["0"],
      modeselected: ["0"]
    });
  }

  GetPaymentDetails(Mode, Submode, Description, Amount) {
    (<FormArray>this.form.get("PayArray")).push(
      this.formBuilder.group({
        Paymode: [Mode],
        Paysubmode: ["select", [Validators.required]],
        payAmount: [Amount, [Validators.required]],
        Descriptions: [Description],
        modeselected: [Submode]
      }) 
    );
   
  }

  get PayArray(): FormArray {
    return this.form.get("PayArray") as FormArray;
  }

}
