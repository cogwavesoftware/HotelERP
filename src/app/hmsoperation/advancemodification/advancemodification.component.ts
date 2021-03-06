import { MasterformService } from 'src/app/_services/masterform.service';
import { OperationService } from 'src/app/_services/operation.service';

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { NgForm } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';

import { CompanyService } from '../../_services/company.service';
import { Branchmodel, } from 'src/app/_models/Branchmodel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advancemodification',
  templateUrl: './advancemodification.component.html',
  styleUrls: ['./advancemodification.component.scss']
})
export class AdvancemodificationComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  btitle = "Add Item";
  sdata: string;
  s1data: any;
  subpaymodelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  TotalBillAmount: number;
  TotalPaidAmount: number;
  TotalBalanceAmount: number;
  isValid: boolean;
  public isShown: boolean = false;
  @Input('modalDefault') modalDefault: any;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  submitted = false;
  public data: Observable<Branchmodel>;
  form: FormGroup;
  mode: string;
  Show: boolean;
  UserId:string;
  Branch:string;
  companyname: any;
  constructor(public _masterservice: MasterformService,
     public _oprservice: OperationService,private toastyService: ToastyService,
    public router: Router, public formBuilder: FormBuilder, private route: ActivatedRoute, private _companyservice: CompanyService) {
    this.mode = "(List)";
    this.UserId=localStorage.getItem('id');
    this.Branch=localStorage.getItem('BranchCode');
    this.form = this.formBuilder.group({
      ReceiptNo: ["0", [Validators.required]],
      BranchCode: [this.Branch, [Validators.required]],
      ModifyBy: [this.UserId, [Validators.required]],
      PayArray: this.formBuilder.array([]),
      BookingNo: ["0", [Validators.required]],
    });
  }

  ngOnInit() {
   
    this.Show = false;
    this.data = this._oprservice.GetAllReceipt("CW_1001");
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



  EditForm(Editform) {
    console.log(Editform.ReceiptNo)
    console.log('Editform')
    this.Show=true
    this.btitle="Hide";
     this.form = this.formBuilder.group({
      ReceiptNo: [Editform.ReceiptNo, [Validators.required]],
      BranchCode: [Editform.BranchCode, [Validators.required]],
      ModifyBy: ["", [Validators.required]],
      PayArray: this.formBuilder.array([]),
      BookingNo:[Editform.ReservationNo, [Validators.required]],
    });
  
    this._oprservice.GetAdvanceReceiptByReciptNo(this.Branch,Editform.ReceiptNo).subscribe(res=>{
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
     });
    
  }
  onDeletePayment(bankAccountID, k) {
    if (k != 0) (<FormArray>this.form.get("PayArray")).removeAt(k);
  }
  AddPaymentButtonClick(): void {
   
    (<FormArray>this.form.get("PayArray")).push(this.AddpaymentGrid());
  }


  FilterPaymentMode(index: number) {
    let mode = this.PayArray.controls[index].get("Paymode").value;
    switch (mode) {
      case "Cash":
        this.subpaymodelist = [];
        this.subpaymodelist.push("Cash")
        //this.GetsubModepayment("Cash")
        break;
      case "Card":
        this.GetsubModepayment("Card", index)
        break;
      case "Online":
        this.GetsubModepayment("Online", index)
        break;
      case "Cheque":
        this.subpaymodelist = [];
        //this.GetsubModepayment("Cheque")
        this.subpaymodelist.push("DD", index)
        break;
      case "Walet":
        this.GetsubModepayment("Walet", index)
        break;
    }
  }
  CloseFormmodel()
  {
    this.Show=!this.Show
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
  

  AddpaymentGrid(): FormGroup {
    return this.formBuilder.group({
      Paymode: ["select"],
      Paysubmode: ["select", [Validators.required]],
      payAmount: [0, [Validators.required]],
      Descriptions: ["0"],
      modeselected: ["0"]
    });
  }

 

  Submit()
  { 
    this.form.patchValue({
      BranchCode:this.Branch,
      ModifyBy:this.UserId
    }) 
    this._oprservice.SaveReservationPosting(this.form.value).subscribe(res=>{
     if(res==true)
       {
        this.addToast(
          "Cogwave Software Technologies Pvt Ltd..",
          "Congratulations Data Saved Sucessfully",
          "Success"
        );
       }
       else
       {
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
       }
    },
    error=>{
      console.log(error.message)
      console.log('error.message')
       this.addToast("Cogwave Software", error.message, "error");
    },
    ()=>{
      this.form.reset();
      this.router.navigate(["/Master/dashboard"]);
    })
   
  }
  CalculateSummaryAmount() {

  this.TotalBillAmount=0;
  this.TotalPaidAmount=0;
    for (let Payarray of this.PayArray.controls) {
      this.TotalPaidAmount += Payarray.get("payAmount").value;
    }
    this.TotalBillAmount =  this.TotalPaidAmount;
  }

  get PayArray(): FormArray {
    return this.form.get("PayArray") as FormArray;
  }
  closeMyModal(event) {
    this.btitle = "Add Item";
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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

