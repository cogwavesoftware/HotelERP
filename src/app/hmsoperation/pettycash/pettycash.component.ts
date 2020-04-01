import { OperationService } from 'src/app/_services/operation.service';
import { MasterformService } from 'src/app/_services/masterform.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
@Component({
  selector: 'app-pettycash',
  templateUrl: './pettycash.component.html',
  styleUrls: ['./pettycash.component.scss']
})
export class PettycashComponent implements OnInit {
  minDate: Date;
  form: FormGroup;
  Branch:string;
  UserId:number;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  ledgerlist:any;
  subpaymodelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
 
  
  closeOther = false;

  filterdata:any;
  
  public showloader  ="false;";
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder, 
    private toastyService: ToastyService) {
      this.minDate = new Date();
      this.Branch="CW_1001";
      this.UserId=1;
     }

    ngOnInit() {
      this.data = this._masterservice.GetBankdetails("CW_1001");
      this.form = this.formBuilder.group({
        Id: ["0", [Validators.required]], 
        voucherno: ["0", [Validators.required]],
        RefNo: ["", [Validators.required]],     
        ledger: ["0", [Validators.required]],
        transaction: ["0", [Validators.required]],
        paymentmode: ["0", [Validators.required]],
        Paysubmode:["0", [Validators.required]],
        particulars: ["0", [Validators.required]],
        payableamount: ["", [Validators.required]] ,
        BranchCode: [this.Branch, [Validators.required]],
        CreatedBy: [this.UserId, [Validators.required]] 
      })

      this._masterservice.getledger(this.Branch).subscribe(res=>{
       this.ledgerlist=res;
      })
    }


    FilterPaymentMode(index: number) {


      let mode = this.form.get("paymentmode").value;
  
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
    GetsubModepayment(Name: string, index: number) {

      this._masterservice.GetAllSubPaymendModeViaMode(this.Branch, Name).subscribe(res => {
        this.subpaymodelist = res
      })
}


Submit(form?: FormGroup) {
 
  console.log(this.form.value)

  if (this.form.invalid) {
    console.log(form.value);
    this.addToast("Cogwave Software", "Invalid Data", "warning");
    return;
  }

  this._operservice.SavePettyDetail(this.form.value).subscribe(data => {
    if (data == true) {
      if (form.value.Id == "0") {
        this.addToast(
          "Cogwave Software",
          "Petty Cash Saved Sucessfully",
          "success"
        );
        form.reset();
      
      } else {
        this.addToast(
          "Cogwave Software",
          "Petty Cash Updated Sucessfully",
          "success"
        );
        form.reset();      
      }
    } else {
      this.addToast("Cogwave Software", "Bank Data Not Saved", "error");
      form.reset({
        IsActive: "true",
        BranchCode: localStorage.getItem("BranchCode"),
        Id: "0"
      });
     
    }
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
