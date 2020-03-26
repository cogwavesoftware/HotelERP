import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-houseguest',
  templateUrl: './houseguest.component.html',
  styleUrls: ['./houseguest.component.scss']
})
export class HouseguestComponent implements OnInit {

  model:any;
  constructor() { }

  ngOnInit() {
    this.model={
      Id:0,
      BranchCode:0,
      IpAdd:1,
      CreatedBy:1,
      RoomNo:0,
      RoomCode:0,
      houseguest:0,
      removeguest:0,
      tarif:0,
      tax:0,
      inclPlan:0,
      excltarif:0,
      SRoomNo:"select"
    }    
  }
  closeMyModalPin(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

}
