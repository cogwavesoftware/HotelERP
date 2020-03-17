import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-shifft',
  templateUrl: './room-shifft.component.html',
  styleUrls: ['./room-shifft.component.scss']
})
export class RoomShifftComponent implements OnInit {
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
      Pax:0,
      grand:0,
      tax:0,
      tarif:0,
      SRoomNo:"select"
    }    
  }
  closeMyModal(event){ 
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }
}
