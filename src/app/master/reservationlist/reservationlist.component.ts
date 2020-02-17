import { Router } from '@angular/router';

import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { ReservationService } from './../../_services/reservation.service';
import { MasterformService } from './../../_services/masterform.service';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrls: ['./reservationlist.component.scss',
              '../../../assets/icon/icofont/css/icofont.scss']
})

export class ReservationlistComponent implements OnInit,AfterViewInit {
  companyList:any
  BookingList:any
  toggle:boolean=true;
  Branch:string;
  @ViewChild('searchdata', { static: false }) searchdata: ElementRef;
  constructor( private _masterservice:MasterformService,public _router:Router,
    private _reservationservice:ReservationService ) {
     }

     ngOnInit() {
      this.Branch="CW_1001";
       this._masterservice.GetRoomcomany(this.Branch).subscribe(data=>{
       this.companyList=data;   
      });
  
      this._reservationservice.GetBookingList(this.Branch).subscribe(data=>{
        this.BookingList=data;
        console.log(this.BookingList)
         
       });
    }
  
    SearchBookingList(search:string)
    {
      this._reservationservice.FilterBookingListAllsearch(this.Branch,search).subscribe(data=>{
        this.BookingList=data;
        console.log(this.BookingList)
         
       });
    }
  
  ngAfterViewInit()
  {
    
    fromEvent(this.searchdata.nativeElement, 'keyup')
    .pipe(
      filter(text => this.searchdata.nativeElement.value.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(x=>console.log('from tap' + x)),
      switchMap(id => {
        //console.log(id)
        return this._reservationservice.FilterBookingListAllsearch(this.Branch, this.searchdata.nativeElement.value);
      })
    ).subscribe(res => {
      this.BookingList = res;   
    });
  
  }
  
  ShowAllCompany()
  {
    this._reservationservice.GetBookingList(this.Branch).subscribe(data=>{
      this.BookingList=data;
      console.log(this.BookingList)
       
     });
  }
  
  ShowAllReservationList()
  {
    this._reservationservice.GetBookingList(this.Branch).subscribe(data=>{
      this.BookingList=data;
      console.log(this.BookingList)
       
     });
  
  }
  
  FilterDataViaCompany(companyname:string)
  {
    this._reservationservice.FilterBookingListViaCompanyName(this.Branch,companyname).subscribe(data=>{
      this.BookingList=data;
      console.log(this.BookingList)
       
     });
  }
  
   Edit(ReservationNo:string)
   {
    this._router.navigate(['/Master/reservation',ReservationNo])
   }
  }
    
  