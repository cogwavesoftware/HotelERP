import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service'; 
 import { HttpClient, HttpEventType } from '@angular/common/http';
 @Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss'],
  
})
export class MaindashboardComponent implements OnInit {
  
  public roomsdetail:Observable<any>;
  model2:any={};
  @ViewChild("f", { static: false }) form: any;
  roomname:any;
  floorname:any;
  constructor(private _masterformservice: MasterformService,private http: HttpClient,
    private _ipservice: IpserviceService  ) { }

  ngOnInit() {
    setTimeout(()=>{   
       this.roomsdetail = this._masterformservice.displayRooms();
    },1);  
  }

  openRoomsPopup(event, roomname ) {
    this.model2 = {       
        roomname: roomname,        
    };
  console.log("roomname"+ roomname  );
  document.querySelector("#" + event).classList.add("md-show");
}
  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
}
 
 
