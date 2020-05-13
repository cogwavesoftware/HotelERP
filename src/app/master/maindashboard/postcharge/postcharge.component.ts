import { OperationService } from './../../../_services/operation.service';
import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
import { NumberFilter } from 'ag-grid-community';
@Component({
  selector: 'app-postcharge',
  templateUrl: './postcharge.component.html',
  styleUrls: ['./postcharge.component.scss']
})
export class PostchargeComponent implements OnInit,OnDestroy {
  form: FormGroup;
  model: any;
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  Branch: string;
  Id: number;
  Roomadvanceform: FormGroup;
  submitted = false;
  Revenuelist: any;
  RoomBolylist: any;
  itemList: any;
  TotalBillAmount:number;
  TotalTaxAmount:number;
  TotalNetAmount:number;
  RoundTax:number;
  @ViewChild('Amount', { static: false }) Amount: ElementRef;
  constructor(
    public router: Router, private toastyService: ToastyService, 
    public formBuilder: FormBuilder, private _oprservice: OperationService,
    private route: ActivatedRoute,
    private _masterservice: MasterformService) {
    //localStorage.getItem("BranchCode")
    this.Branch = "CW_1001";
    this.Id=1;
  }


  ngOnInit() {
   
    this.TotalBillAmount=0;
    this.TotalTaxAmount=0;
    this.TotalNetAmount=0;
    this._masterservice.getrevenudata(this.Branch).subscribe(res => {
      this.Revenuelist = res;
    });


    this._masterservice.GetSwardDetail(this.Branch).subscribe(res => {
      this.RoomBolylist = res;
    });


    this.form = this.formBuilder.group({
      PayExtra: this.formBuilder.array([]),
      RoomNo: [this.RoomNo, Validators.required],
      RoomCode: [this.RoomCode, Validators.required],
      RefBillNo: ['', Validators.required],
      stward: ['0', Validators.required],
      revname: ["0", Validators.required],
      taxvalue: ['0', Validators.required],
      BranchCode: [this.Branch, Validators.required],
      CreatedBy: [this.Id, Validators.required],
      TotalBillAmount: [this.TotalBillAmount, Validators.required],
      TotalTaxAmount: [this.TotalTaxAmount, Validators.required],
      TotalNetAmount: [this.TotalNetAmount, Validators.required],
    });


  }
  /* below code for auto search in dropdownlist */
  public saveCode(index, Name): void {
    let name = Name;
    let list = this.itemList.filter(x => x.ItemName === Name)[0];
    console.log('list')
    console.log(list)
    if (list == undefined) {
      // this.PayExtra.controls[index].patchValue({
        
      // }) 
    }
    else {
      let Rate = list['Rate']
      let TotalAmount= Rate * 1
      let Taxmount = TotalAmount * this.form.get('taxvalue').value / 100;
      let Net = Taxmount + TotalAmount
      this.PayExtra.controls[index].patchValue({
        Rate: Rate,
        TotalAmount:TotalAmount,
       // Quanity:Quanity,
        TaxAmount: Taxmount,
        Net: Net
      });
      //this.AddExtrachargeButtonClick();
      
    }
    this.CalculateSummaryAmount();
  }


  get PayExtra(): FormArray {
    return this.form.get("PayExtra") as FormArray;
  }
  /* end below code for auto search in dropdownlist */

  AddExtraChargeGrid(): FormGroup {
    return this.formBuilder.group({
      itemname: [],
      Rate: [],
      Quanity: 1,
      TotalAmount: [],
      TaxAmount: [],
      Net:[]
    });
  }
  AddExtrachargeButtonClick(): void {
    (<FormArray>this.form.get("PayExtra")).push(this.AddExtraChargeGrid());
  }

  onDeleteExtracharge(k) {
    (<FormArray>this.form.get("PayExtra")).removeAt(k);
  }
    


  removeItem() {
    let val =10;
   for(let k=0; k<val; k++)
   {
     let len=this.PayExtra.length
     if(len>=1)
     {
      this.PayExtra.removeAt(this.PayExtra.length - 1);
     }
   }  
 }

  GetTaxvalue() {
    this._masterservice.GetTaxValueByRevd(this.Branch, this.form.get('revname').value).subscribe((data: any) => {
      console.log('data')
      console.log(data)
      this.form.patchValue({
        taxvalue: data
      })
    });
    this._masterservice.getitemmaster(this.Branch).subscribe(res => {
      this.itemList = res;
    });
  }




  CalculateTaxAmount(index) {
 
      this.PayExtra.controls[index].patchValue({
        TaxAmount: 0,
        TotalAmount: 0
      });
     
      let Quanity=this.PayExtra.controls[index].get('Quanity').value
      if(Quanity>=1)
      {
        debugger
        let Rate = this.PayExtra.controls[index].get('Rate').value;
        let Taxper=  this.form.get('taxvalue').value
        let TotAmt=Rate *  Quanity;

        this.RoundTax = TotAmt / 100 * Taxper;
        //alert( this.RoundTax)
        let Taxmount=TotAmt / 100 * Taxper;
        let Net = Taxmount + TotAmt
        this.PayExtra.controls[index].patchValue({
          Rate: Rate,
          TaxAmount: Taxmount,
          TotalAmount: TotAmt,
          Net:Net
        });
      this.CalculateSummaryAmount();
      }
      
  }

  Submit(form:FormGroup)
  {   
   
    this.form.patchValue({
      TotalBillAmount:this.TotalBillAmount,
      TotalTaxAmount:this.TotalTaxAmount,
      TotalNetAmount:this.TotalNetAmount,
      RoomCode:this.RoomCode,
      RoomNo:this.RoomNo
    })
     console.log(form.value)
     console.log(this.form.value)
     this._oprservice.SavePostChargeData(form.value).subscribe(data => {
       if (data == true) {
         this.addToast(
           "Cogwave Software",
           "Postcharge Information Saved Sucessfully",
           "success"
         );
       } 
       else {       
         this.addToast("Cogwave Software", "Postcharge Information Not Saved", "error");      
       }
     },
     error => {
       this.addToast("Cogwave Software", "Postcharge Information Not Saved", "error");
     },
     ()=>{
      this.closeMyModalPin(event);
     });
  }


  closeMyModalPin(event) {
    this.form.reset();
    this.form.patchValue({
      RoomNo:this.RoomNo,
      RoomCode:this.RoomCode,
      stward:"0",
      revname:"0",
      taxvalue:0
    })
    this.removeItem();
    this.TotalBillAmount=0;
    this.TotalTaxAmount=0;
    this.TotalNetAmount=0;  
    var openModals = document.querySelectorAll(".md-show");
    for (let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show");
    }
  }



  CalculateSummaryAmount() {
    this.TotalBillAmount=0;
    this.TotalTaxAmount=0;
    this.TotalNetAmount=0;  
    for (let Extrach of this.PayExtra.controls) {
      this.TotalBillAmount += Extrach.get("TotalAmount").value;
      this.TotalTaxAmount += Extrach.get("TaxAmount").value;
      this.TotalNetAmount += Extrach.get("Net").value;
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
