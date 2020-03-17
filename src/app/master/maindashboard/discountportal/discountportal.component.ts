import { Component, OnInit, ViewChild,Renderer2 } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Observable } from 'rxjs'; 
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';

@Component({
  selector: 'app-discountportal',
  templateUrl: './discountportal.component.html',
  styleUrls: ['./discountportal.component.scss']
})
export class DiscountportalComponent implements OnInit {
  discountvalue:string[]= ["50%","100%"];
  Branch: string;
  discountportalform: FormGroup;
  submitted = false;
  minDate = new Date();
  maxDate = new Date();
  constructor(  
    public router: Router,   private renderer: Renderer2,
    public formBuilder: FormBuilder,  
    private route: ActivatedRoute, 
    private _masterservice: MasterformService) { 
      this.Branch= localStorage.getItem("BranchCode");
    }

  ngOnInit() {
    this.discountportalform = this.formBuilder.group({
      frmdate: [new Date(), [Validators.required]],
      checkindate: [new Date(), [Validators.required]],      
      roomno: ['', Validators.required] ,      
      discvalue: ['', Validators.required] ,
      checkinno: ['', Validators.required],      
      reason: ['', Validators.required],
      remarks: ['', Validators.required],
      disctype: ["1", [Validators.required]],
    }); 
  }

}
