import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs"; 
import { OperationService } from 'src/app/_services/operation.service';
import { MasterformService } from 'src/app/_services/masterform.service';
@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.component.html',
  styleUrls: ['./driverdetail.component.scss']
})
export class DriverdetailComponent implements OnInit {
  form: FormGroup;
  Branch:string;
  UserId:number;
  public data: Observable<any>;
  filterdata:any;
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder ) { 
      this.Branch="CW_1001";
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Id: ["0", [Validators.required]], 
      drivername: ["", [Validators.required]],
      mobileno: ["", [Validators.required]],
      vehicleno: ["", [Validators.required]],
      charge: ["", [Validators.required]],
      guestname: ["", [Validators.required]],
      roomno: ["", [Validators.required]]
      
    })
  }

}
