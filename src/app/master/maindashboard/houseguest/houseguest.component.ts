import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-houseguest',
  templateUrl: './houseguest.component.html',
  styleUrls: ['./houseguest.component.scss']
})
export class HouseguestComponent implements OnInit {
  @Input () RoomNo:string
  @Input () RoomCode:string
  
  model:any;
  constructor() { }

  ngOnInit() {
    this.model={
      BranchCode:0,
      CreatedBy:1,
      RoomNos:this.RoomNo,
      RoomCodes:this.RoomCode,
      Type:0,
      tarif:0,
      status:0,     
    }    
  }
  closeMyModalPin(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

}
