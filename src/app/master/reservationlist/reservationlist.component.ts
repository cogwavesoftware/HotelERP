import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { ReservationService } from './../../_services/reservation.service';
import { MasterformService } from './../../_services/masterform.service';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'

import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrls: ['./reservationlist.component.scss',
              '../../../assets/icon/icofont/css/icofont.scss']
})

export class ReservationlistComponent implements OnInit,AfterViewInit {
  companyList:any;
  BookingList:any;
  subpaymodelist: any;
  toggle:boolean=true;
  Branch:string;
  model: any = {};
  Reslavelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  @ViewChild('searchdata', { static: false }) searchdata: ElementRef;
  constructor( private _masterservice:MasterformService,public _router:Router,private toastyService: ToastyService,
    private _reservationservice:ReservationService ) {
      this.model.RefundType="-1"
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

    GetsubModepayment(Name: string) {

      this._masterservice.GetAllSubPaymendModeViaMode(this.Branch, Name).subscribe(res => {
        this.subpaymodelist = res
      })
  
    }
    
  FilterPaymentMode(mode: string) {
    alert(mode)
    switch (mode) {
      case "Cash":
        this.subpaymodelist = [];
        this.subpaymodelist.push("Cash")     
        break;
      case "Card":
        this.GetsubModepayment("Card")
        break;
      case "Online":
        this.GetsubModepayment("Online")
        break;
      case "Cheque":
        this.subpaymodelist = [];
       
        this.subpaymodelist.push("DD")
        break;
      case "Walet":
        this.GetsubModepayment("Walet")
        break;
    }

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

  CancelReservation(event, data)
  {

    this.model.GuestName=data.GuestName;
    this.model.BookingNo=data.BookingNo;
    this.model.CompanyName=data.CompanyName;
    this.model.Status=data.Status;
    this.model.BillAmount=data.BillAmount;
    this.model.AdvancePaidAmount=data.AdvancePaidAmount;
    



    document.querySelector("#" + event).classList.add("md-show");
    this._reservationservice.GetReservationslaveDetail(this.Branch,data.BookingNo).subscribe(res=>{
      this.Reslavelist=res;
    })
  }

  onSubmitReservationCancel(form?: NgForm)
  {
    debugger;
    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = 1;
    
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
  


  addToast(title, Message, theme) {

    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 3000,
      theme: theme,
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
        // this.router.navigate(['/dashboard/default']);
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (theme) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":

        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
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
    
  