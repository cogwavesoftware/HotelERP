import { Component, OnInit } from '@angular/core';

import { OperationService } from 'src/app/_services/operation.service';
import { MasterformService } from 'src/app/_services/masterform.service';
 import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
 import { Observable } from "rxjs";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'

@Component({
  selector: 'app-advancetransfer',
  templateUrl: './advancetransfer.component.html',
  styleUrls: ['./advancetransfer.component.scss']
})
export class AdvancetransferComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder, 
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Id: ["0", [Validators.required]], 
      voucherno: ["0", [Validators.required]],
      roomno: ["0", [Validators.required]],
      receiptno: ["", [Validators.required]],     
      amount: ["0", [Validators.required]],
      transroomno: ["0", [Validators.required]] 
    })
  }

}
