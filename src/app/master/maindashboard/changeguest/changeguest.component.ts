import { MasterformService } from './../../../_services/masterform.service';
import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Observable, Observer, empty, fromEvent, pipe, } from "rxjs";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-changeguest',
  templateUrl: './changeguest.component.html',
  styleUrls: ['./changeguest.component.scss']
})
export class ChangeguestComponent implements OnInit {
  model:any;
  guest:any;
  @ViewChild('searchTermguest',{static:false}) searchTermguest:ElementRef
  constructor(private _masterservice:MasterformService) {
  

      }
  ngOnInit() {
    this.model={
      Id:0,
      BranchCode:0,
      IpAdd:1,
      CreatedBy:1,
      RoomNo:0,
      RoomCode:0,
      Pax:0,
      grand:0,
      tax:0,
      tarif:0,
      SRoomNo:"select"
    }    

    fromEvent(this.searchTermguest.nativeElement, 'keyup')
    .pipe(
      filter(text => this.searchTermguest.nativeElement.value.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(x=>console.log('from tap' + x)),
      switchMap(id => {
        //console.log(id)
        console.log('guestmap')
        return this._masterservice.GuetDataSearch("CW_1001", this.searchTermguest.nativeElement.value);
      })
    ).subscribe(res => {
      this.guest = res
      console.log('res')
      console.log(res)
    });
  }
  DoCheck()
  {
    alert('D')
  }
  closeMyModalPin(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

}
