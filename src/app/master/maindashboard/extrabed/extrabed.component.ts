
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,
  Validators, NgModel
} from "@angular/forms";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';

@Component({
  selector: 'app-extrabed',
  templateUrl: './extrabed.component.html',
  styleUrls: ['./extrabed.component.scss']
})
export class ExtrabedComponent implements OnInit {
  model:any;
  @Input() RoomCode: string;
  @Input() RoomNo: string;
  Branch: string;
  Roomadvanceform: FormGroup;
  submitted = false;
  subpaymodelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  constructor(  
    public router: Router,
    public formBuilder: FormBuilder,private _oprservice:OperationService, 
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001"       
     }
 

     ngOnInit() {
      this.model={
        Id:0,
        BranchCode:0,
        IpAdd:1,
        CreatedBy:1, 
        Roomno:0,
        RoomCode:0,
        guestname:0,
        noOfbeds:0,
        tarif:0,
        bedamt:0,
        taxamount:0,
        netamount:0,
        reason:0        
      }    
    }

}
