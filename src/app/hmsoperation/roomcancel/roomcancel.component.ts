import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-roomcancel',
  templateUrl: './roomcancel.component.html',
  styleUrls: ['./roomcancel.component.scss']
})
export class RoomcancelComponent implements OnInit {

  minDate: Date;
  form: FormGroup;
  constructor(private datePipe: DatePipe,private fb: FormBuilder,
    public router: Router, public formBuilder: FormBuilder) {
      this.minDate = new Date();
     } 
     ngOnInit() {
      this.form = this.formBuilder.group({
        roomno: ["0", [Validators.required]],
        guestname: ["0", [Validators.required]],
        advance: ["0", [Validators.required]],      
        tarrif: ["0", [Validators.required]],
        refuntamt: ["0", [Validators.required]],
        guestaddress:["",[Validators.required]],
        reason:["",[Validators.required]]
      })
    }

}
