import { Component, OnInit, ViewChild,Renderer2 } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Observable } from 'rxjs'; 
  import { Router, ActivatedRoute } from "@angular/router";
  import { MasterformService } from 'src/app/_services/masterform.service';

@Component({
  selector: 'app-blockingdetails',  
  templateUrl: './blockingdetails.component.html',
  styleUrls: ['./blockingdetails.component.scss']
})
export class BlockingdetailsComponent implements OnInit {
  Branch: string;
  blockingdetailsform: FormGroup;
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
    this.blockingdetailsform = this.formBuilder.group({
      frmdate: [new Date(), [Validators.required]],
      noofdays: ['', Validators.required] ,
      todate:[new Date(),Validators.required],
      roomno: ['', Validators.required] ,
      roomcode: ['', Validators.required] ,
      rname: ['', Validators.required],
      reason: ['', Validators.required],
    }); 
  }

}
