import { OperationService } from './../../../_services/operation.service';
import { Component, OnInit,Input, ViewChild,Renderer2 } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
 import { Router, ActivatedRoute } from "@angular/router";
 import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-advanceform',
  templateUrl: './advanceform.component.html',
  styleUrls: ['./advanceform.component.scss']
})
export class AdvanceformComponent implements OnInit {
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
  subpaymodelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor(  
    public router: Router,   private renderer: Renderer2,
    public formBuilder: FormBuilder,private _oprservice:OperationService, 
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001"       
     }
 
     ngOnInit() {
      this.Roomadvanceform = this.formBuilder.group({
        roomno: ['', Validators.required] ,
        bookdate: ['', Validators.required] ,
        gname:['',Validators.required],
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
      this.submitted = true;        
      if (this.Roomadvanceform.invalid) {
          return;
      }

      alert('SUCCESS!! :-)')
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
   this._oprservice.GetAllReceipt(this.Branch,RoomNo).subscribe(data => {
    this.subpaymodelist = data;
  })

}



}
