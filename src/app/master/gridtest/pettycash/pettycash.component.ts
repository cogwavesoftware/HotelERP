import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-pettycash',
  templateUrl: './pettycash.component.html',
  styleUrls: ['./pettycash.component.scss']
})
export class PettycashComponent implements OnInit {
  form: FormGroup;
  constructor(private datePipe: DatePipe,private fb: FormBuilder,
    public router: Router, public formBuilder: FormBuilder) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      voucherno: ["0", [Validators.required]],
      pdate: ["0", [Validators.required]],
      ptime: ["0", [Validators.required]],      
      ledger: ["0", [Validators.required]],
      transaction: ["0", [Validators.required]],
      paymentmode: ["0", [Validators.required]],
      particulars: ["0", [Validators.required]],
      payableamount: ["0", [Validators.required]] 
    })
  }

}
