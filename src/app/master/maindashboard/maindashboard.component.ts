import { Component, OnInit,ViewChild ,OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { HmsdashboardService } from './../../_services/hmsdashboard.service';
import { IpserviceService } from 'src/app/_services/ipservice.service'; 
 import { HttpClient, HttpEventType } from '@angular/common/http';
 import { BankService } from 'src/app/_services/bank.service';
 @Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss'],  
})
export class MaindashboardComponent implements OnInit,OnDestroy {
  
  // public roomsdetail:Observable<any>;
  public roomsdetail ;
  model2:any={};
  @ViewChild("f", { static: false }) form: any;
  roomname:any;
  floorname:any;
  rmno:string = "1000";
  roomname1:string;
  finalMenu = new Array();
  floor=new Array<any>();
  model:any;
  constructor(private _masterformservice: MasterformService,private http: HttpClient,
    private _ipservice: IpserviceService,private _hmsdashboard:HmsdashboardService,private _bankservice:BankService  ) {     
      this._bankservice.changeMessage("collapsed")
    }

  ngOnInit() {
   
    this._hmsdashboard.GetHmsDashboard('CW_1001').subscribe(res=>{
      this.finalMenu=res;
       alert('d')
     
      setInterval(()=>{
        this._hmsdashboard.GetHmsDashboard('CW_1001').subscribe(res=>{
          this.finalMenu=res;
          console.log(this.finalMenu);
        })    
      },7000)
     
    })

  }

  openMyModal(event,name){
    console.log("roomname"  );
    document.querySelector("#" + event).classList.add("md-show");
  }
  openRoomsPopup(event, roomname ) {
    this.model2 = {       
        roomname: roomname,        
    };
  console.log("roomname"+ roomname  );
  document.querySelector("#" + event).classList.add("md-show");
}

 ngOnDestroy() {   
   this._bankservice.changeMessage("expanded")
 }
openspecial(event, roomname){
  console.log("openspecial"  );
  document.querySelector("#" + event).classList.add("md-show");
}
parentroomhover(rmno:string,roomname1:string){
  this.rmno = rmno;
  this.roomname1=roomname1;
  console.log( this.rmno+this.roomname1);
}
modelroomhover (){
  console.log("test");
}
  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
}
 
 
