import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roominstruction',
  templateUrl: './roominstruction.component.html',
  styleUrls: ['./roominstruction.component.scss']
})
export class RoominstructionComponent implements OnInit {

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
      roomdate:"12/12/2020"
    }    
  }
  closeMyModal(event){  
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }

}
