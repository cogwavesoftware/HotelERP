import { OperationService } from './../../../_services/operation.service';
import { Component, OnInit,Input, ViewChild,Renderer2 } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
 import { Router, ActivatedRoute } from "@angular/router";
 import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'

@Component({
  selector: 'app-advanceform',
  templateUrl: './advanceform.component.html',
  styleUrls: ['./advanceform.component.scss']
})
export class AdvanceformComponent implements OnInit {
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  Branch: string;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  Roomadvanceform: FormGroup;
  submitted = false;
  subpaymodelist:any;
  UserId:number;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor(  
    public router: Router,private toastyService: ToastyService,
    public formBuilder: FormBuilder,private _oprservice:OperationService,private route: ActivatedRoute,
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001" 
      this.UserId=1      
     }
 
     ngOnInit() {
      this.Roomadvanceform = this.formBuilder.group({
        roomno: [this.RoomNo, Validators.required] ,      
        roomcode:[this.RoomCode,Validators.required],
        BranchCode: [this.Branch, [Validators.required]],
        CreatedBy: [this.UserId, [Validators.required]] ,
        PayArray: this.formBuilder.array([this.AddpaymentGrid()]), 
      }); 
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
    get PayArray(): FormArray {
      return this.Roomadvanceform.get("PayArray") as FormArray;
    }

    AddPaymentButtonClick(): void {
      (<FormArray>this.Roomadvanceform.get("PayArray")).push(this.AddpaymentGrid());
    }


  onSubmit() {
 
    this.Roomadvanceform.patchValue({
      roomno:this.RoomNo,
      roomcode:this.RoomCode
    })
    console.log(this.Roomadvanceform.value)
  this._oprservice.SaveAdvanceData(this.Roomadvanceform.value).subscribe(data => {
    if (data == true) {     
        this.addToast(
          "Cogwave Software",
          "Advance Saved Sucessfully",
          "success"
        );        
    } 
    else {
      this.addToast("Cogwave Software", "Advance  Not Saved", "error");  
    }
  },
  error=>{
    console.log('error')
    console.log(error)
    this.addToast("Cogwave Software", "Advance  Not Saved", "error");
  },
  ()=>{
    this.closeMyModalPin(event)
  });

}


  onDeletePayment(bankAccountID, k) {
     if (k != 0) (<FormArray>this.Roomadvanceform.get("PayArray")).removeAt(k);
   
  }
  
  FilterPaymentMode(index: number) {


    let mode = this.PayArray.controls[index].get("Paymode").value;
    alert(mode)
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
  PatchSubModeName(index: number) {
    alert(index)
    let DescriptionMode = this.PayArray.controls[index].get("Paysubmode").value;
    this.PayArray.controls[index].patchValue({
      modeselected: DescriptionMode
    })

    this.PayArray.controls[index].get("modeselected").disable({ onlySelf: true });
  }
   

  GetsubModepayment(Name: string, index: number) {
  
    this._masterservice.GetAllSubPaymendModeViaMode(this.Branch, Name).subscribe(res => {
      this.subpaymodelist = res;
    })

  }


  
GetAllRoomAdvanceList(RoomNo: string)
{
   this._oprservice.GetAllReceiptviaRoomNo(this.Branch,RoomNo).subscribe(data => {
    this.subpaymodelist = data;
  })

}

removeItem() {
  let val =10;
 for(let k=0; k<val; k++)
 {
   let len=this.PayArray.length
   if(len>=1)
   {
    this.PayArray.removeAt(this.PayArray.length - 1);
   }
 }  
}
closeMyModalPin(event) {
this.Roomadvanceform.reset();
this.Roomadvanceform.patchValue({
  RoomNo:this.RoomNo,
  RoomCode:this.RoomCode,
  CreatedBy:this.UserId,
  BranchCode:this.Branch, 
})
this.removeItem();
var openModals = document.querySelectorAll(".md-show");
for (let i = 0; i < openModals.length; i++) {
  openModals[i].classList.remove("md-show");
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
