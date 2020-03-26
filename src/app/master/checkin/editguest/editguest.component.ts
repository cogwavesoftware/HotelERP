import { Component, OnInit } from '@angular/core';
import {
  HostListener,  Renderer2, ViewEncapsulation,
  ViewChild, ElementRef, SimpleChanges, OnChanges
} from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
 import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { MasterformService } from "src/app/_services/masterform.service";

@Component({
  selector: 'app-editguest',
  templateUrl: './editguest.component.html',
  styleUrls: ['./editguest.component.scss']
})
export class EditguestComponent implements OnInit {

  constructor(private datePipe: DatePipe, private fb: FormBuilder,
    public router: Router,   private renderer: Renderer2,
    public formBuilder: FormBuilder, 
    private route: ActivatedRoute,      
    private _masterservice: MasterformService 
  ) { }

  ngOnInit() {
  }

}
