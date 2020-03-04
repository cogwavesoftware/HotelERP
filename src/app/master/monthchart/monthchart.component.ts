import { LoaderService } from './../../_services/loader.service';

import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { Observable, Observer, empty,Subject } from "rxjs";
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { AvailabilitymodelMonth } from './../../_models/MonthAvailabilitymodel';
import { ReservationService } from './../../_services/reservation.service';

@Component({
  selector: 'app-monthchart',
  templateUrl: './monthchart.component.html',
  styleUrls: ['./monthchart.component.scss']
})
export class MonthchartComponent implements OnInit {
  Availabilitylist: AvailabilitymodelMonth[] = [];
  roomtype= [];
   HeadeDate=[];
   HeadeDate123:[]=[];
   minDate: Date;
   maxDate:Date;
   golbalresponse:any;
   Day:number=0;
   form:FormGroup;
   InitalDate:Date;
   reservloader:boolean=true;
   Branch:string;
   isLoading: Subject<boolean>;
  constructor(private _reservationService:ReservationService, public formBuilder: FormBuilder,
    private datePipe: DatePipe,private loaderService: LoaderService) {
      this.Branch="CW_1001"
      //let CurrentDate=this.datePipe.transform(this.InitalDate,"dd/MM/yyyy")   
      //console.log(CurrentDate)
      this.form = this.formBuilder.group({
        nofdays: ["0", [Validators.required]],
        checkindate: [new Date(Date.now()), [Validators.required]],
        
      });
      
     }

  ngOnInit() {    
    this.Availabilitylist=[];
    this.HeadeDate=[];
    let CurrentDate=this.datePipe.transform(this.form.get('checkindate').value,"MM/dd/yyyy")
    this._reservationService.ReservatiomMonthlyChart(this.Branch,CurrentDate,0).subscribe(res=>{
      this.golbalresponse = res;
        this.Availabilitylist = this.golbalresponse;
        this.roomtype = this.Availabilitylist[0].Rooms; 
        this.roomtype.forEach(x=>{
         
          this.HeadeDate.push(x.date)
        })  
             
    })
  }


  

ChangeCheckoutDate()
{
  

  this.Availabilitylist=[];
  this.HeadeDate=[];
   let CheckinDatce = this.form.get('checkindate').value;
   console.log(CheckinDatce)
   alert(CheckinDatce.length)
   //let CheckinDatces =this.datePipe.transform(this.form.get('checkindate').value, "dd/MM/yyyy");
   
    this.form.patchValue({
      checkoutdate: CheckinDatce
    })
}

LoadChartData()
{

  this.reservloader=true;

  setTimeout(() => {
    this.reservloader = false;
  }, 15000)


  this.Availabilitylist=[];
  this.HeadeDate=[];
  let nodays=this.form.get('nofdays').value;
  let CurrentDate=this.datePipe.transform(this.form.get('checkindate').value,"MM/dd/yyyy")
  this._reservationService.ReservatiomMonthlyChart(this.Branch,CurrentDate,nodays).subscribe(res=>{
    this.golbalresponse = res;
      this.Availabilitylist = this.golbalresponse;
      this.roomtype = this.Availabilitylist[0].Rooms; 
      this.roomtype.forEach(x=>{
       
        this.HeadeDate.push(x.date)
      })      
  })
}





}
function GFG_Fun() { 
  var date = new Date(); 
  var month = date.getMonth() + 1; 
  var year = date.getFullYear(); 

  // down.innerHTML = "Number of days in " + month 
  //             + "th month of the year " + year  
  //             +" is "+ daysInMonth(month, year); 
}
