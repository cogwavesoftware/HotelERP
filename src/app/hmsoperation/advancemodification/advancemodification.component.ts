import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef,Inject, PLATFORM_ID, } from "@angular/core";
import { Observable, Observer, empty } from "rxjs";
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import {HttpClient} from '@angular/common/http'; 
export class CrmContact {
  receiptno: string;
  guestname: any;
  amount: string;
  date: string; 
}
@Component({
  selector: 'app-advancemodification',
  templateUrl: './advancemodification.component.html',
  styleUrls: ['./advancemodification.component.scss']
})
export class AdvancemodificationComponent implements OnInit {
public data: Observable<CrmContact>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  // rows = [];
  selected = [];
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>; 
  model: any = {};
  maxDate = new Date();
  myTime = new Date();
  todate = new Date();
  fromdate = new Date();
  isSelected=false;
  constructor(public httpClient: HttpClient,private datePipe: DatePipe, elementRef: ElementRef,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.model.frmdate = new Date();
    this.data = this.httpClient.get<CrmContact>(`assets/data/crm-contact.json`);
    console.log(this.data);
  }
    openMyModal(event,data ) {  
    this.isSelected = true;
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModalPin(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

}
