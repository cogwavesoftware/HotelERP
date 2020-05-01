import { NgForm } from '@angular/forms'; 
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expresscheckin',
  templateUrl: './expresscheckin.component.html',
  styleUrls: ['./expresscheckin.component.scss']
})
export class ExpresscheckinComponent implements OnInit {
    expresscheckinmmodel ;

  constructor() { }

  ngOnInit() {
    this.expresscheckinmmodel={
      Id:0,
      BranchCode:"0",
      IpAdd:"0",
      CreatedBy:0,
      guestname:"0",
      mobile:"0",
      roomno:"0",
      roomcode:"0",
      pay:"0",
      fax:"0",
      plan:"0",
      tariff:"0",
      tax:"0",
      net:"0"  
      }  
  }
  closeMyModal(event,form?:NgForm){  
    form.resetForm();
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    }  
  }
}
