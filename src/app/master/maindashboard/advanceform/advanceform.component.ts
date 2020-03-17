
import { Component, OnInit, ViewChild,Renderer2 } from '@angular/core';
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
   
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
   
  constructor(  
    public router: Router,   private renderer: Renderer2,
    public formBuilder: FormBuilder,  
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch= localStorage.getItem("BranchCode"); 
      
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

}
