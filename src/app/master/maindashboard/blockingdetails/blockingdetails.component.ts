


import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges,DoCheck } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {  FormBuilder,  FormGroup,  FormArray,  FormControl,  ValidatorFn, 
   Validators, NgModel} from "@angular/forms";
import { NgForm } from '@angular/forms';
  import { Router, ActivatedRoute } from "@angular/router";
  //import { MasterformService } from 'src/app/_services/masterform.service';




  
@Component({
  selector: 'app-blockingdetails',  
  templateUrl: './blockingdetails.component.html',
  styleUrls: ['./blockingdetails.component.scss']
})
export class BlockingdetailsComponent implements OnInit {
  Branch: string;
  blockingdetailsform: FormGroup;
  submitted = false;
  IsLongTime:Boolean=false;
  minDate = new Date();
  maxDate = new Date();
  Name:string="Blocking Data"; 
  model:any;
  @Input() RoomCode : string;
  @Input() RoomNo : string;
  constructor(public router: Router, private route: ActivatedRoute,public formBuilder: FormBuilder)
   { }


  ngOnInit()
   {
    

   
    this.blockingdetailsform = this.formBuilder.group({
      Status: ['SHORT', Validators.required],
      Blockfrmdate: [new Date(), [Validators.required]],
      noofdays: ['', Validators.required] ,
      BlocktoDate:[new Date(),Validators.required],
      roomno: [this.RoomNo, Validators.required] ,
      roomcode: [this.RoomCode, Validators.required] ,
      rname: ['', Validators.required],
      reason: ['', Validators.required],
    }); 
  }

  // ngOnChanges(changes:SimpleChanges)
  // {
  //   console.log('changes')
  //   console.log(changes.Inputvalue)
  
  // }
  // ngDoCheck()
  // {
  //   console.log('child ngDoCheck')
  //   console.log(' child ngDoCheck' + this.Inputvalue)
    
  // }
   
  Submit(blockingdetails:FormGroup)
  {
    alert('d')

    console.log(blockingdetails)
    console.log('blockingdetails')
    console.log(this.blockingdetailsform.value)
  

  }

  Selected(MName:string)
  { 
    
    this.IsLongTime=!this.IsLongTime

  }

}
