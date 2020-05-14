import { NgForm } from '@angular/forms';
import { OperationService } from 'src/app/_services/operation.service';

import { RoomShifftFormmodel } from './../../../_models/RoomShifftFormmodel';
import { Component,ViewChild, OnInit, Input,ElementRef } from '@angular/core';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
import { fromEvent } from 'rxjs';

import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { format } from 'url';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
@Component({
  selector: 'app-room-shifft',
  templateUrl: './room-shifft.component.html',
  styleUrls: ['./room-shifft.component.scss']
})
export class RoomShifftComponent implements OnInit {
model:any;
theme = "bootstrap";
Typelist:any;
 type = "default";
 position = 'top-right';
 Getvaluemodel:any={};
 @ViewChild('searchTermguest', { static: false }) searchTermguest: ElementRef;
 @ViewChild('Tariff', { static: false }) Tariff: ElementRef;
@Input() roomshifftformmodel :RoomShifftFormmodel
  constructor(private toastyService: ToastyService,private _oprservice:OperationService ) { }
  ngOnInit() {
    let id=localStorage.getItem("Id");
  this.roomshifftformmodel={
    Id:0,
    BranchCode:"0",
    IpAdd:"0",
    CreatedBy:Number(id),
    CRoomNo:"0",
    CRoomCode:"0",
    SRoomNo:"0",
    SRoomCode:"0",
    GuestName:"0",
    Tariff:0,    
    Tax:0,
    NetAmount:0,
    Reason:"0",
    Mode:"0"
    }    
  }
  LoadType(RoomNo:string )
  {
    this._oprservice.GetRoomTypeViaRoomNo(this.roomshifftformmodel.BranchCode,RoomNo).subscribe(data => {
             this.Typelist=data;
    })
  }
  GetRoomValue(Description:string,Amount:number,RoomNo:string,RoomCode:string,SRoomNo:string)
  { 
    this.Getvaluemodel={   
      Description:Description,
      Amount:Amount,
      RoomNo:RoomNo,
      RoomCode:RoomCode,
      BranchCode:localStorage.getItem("BranchCode"),
      Tariff:0,
      Tax:0,
      NetAmount:0,
      SRoomNo:SRoomNo,
    }
    debugger
    // console.log(this.NetAmountttttt.nativeElement)
    // fromEvent(this.NetAmountttttt.nativeElement, 'keyup')
    // .pipe(
    //   filter(text => this.NetAmountttttt.nativeElement.value > 200),
    //   debounceTime(8000),
     
    //   distinctUntilChanged(),
    //   // tap(x=>console.log('from tap' + x)),
    //   switchMap(id => {
    //     //console.log(id)
    //     console.log('guestmap')
    //     console.log(this.Getvaluemodel)
    //     return this._oprservice.GetRoomValue(this.Getvaluemodel);
    //   })
    // ).subscribe(res => 
    //  console.log(res)
    //   );


    setTimeout (()=>{
      this._oprservice.GetRoomValue(this.Getvaluemodel).subscribe(data => {
        this.roomshifftformmodel.NetAmount=data['NetAmount']
        this.roomshifftformmodel.Tariff=data['Tariff']
        this.roomshifftformmodel.Tax=data['Tax']
        console.log(data)
     })
    },3000)

  }



  // ngAfterViewInit() {
  //   alert('k')
  //   //server-side search
  //  fromEvent(this.searchTermguest.nativeElement, 'keyup')
  //   .pipe(
  //     filter(text => this.searchTermguest.nativeElement.value.length > 2),
  //     debounceTime(3000),
  //     distinctUntilChanged(),
  //     // tap(x=>console.log('from tap' + x)),
  //     switchMap(id => {
  //       //console.log(id)
  //       console.log('guestmap')
  //       console.log(this.Getvaluemodel)
  //       return this._oprservice.GetRoomValue(this.Getvaluemodel);
  //     })
  //   ).subscribe(res => 
  //    console.log(res)
  //     );
  // }


  SaveRoomShift(form?: NgForm) {
    // form.value.BranchCode = localStorage.getItem("BranchCode")
    // form.value.CreatedBy = localStorage.getItem("id")
    // form.value.ModifyBy = localStorage.getItem("id")
    // form.value.IpAddress = localStorage.getItem("LOCAL_IP")
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._oprservice.SaveRoomShifft(form.value).subscribe(data => {
      if (data == true) {
          this.addToast("Cogwave Software","RoomShift Saved Sucessfully",  "success");  
        } 
        else
        {
          this.addToast("Cogwave Software", "Advance  Not Saved", "error");  
        }
      },
      error=>{
        console.log('error')
        console.log(error)
        this.addToast("Cogwave Software", "Advance  Not Saved", "error");
      },
      ()=>{
        this.closeMyModal(event,form)
      });
  }
 

  closeMyModal(event,form?:NgForm){  
    form.resetForm();
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }
  
  addToast(title, Message, theme) {
    debugger;
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
        debugger;
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
  

}
