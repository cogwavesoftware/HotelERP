import { NgForm } from '@angular/forms'; 
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-linkadvance',
  templateUrl: './linkadvance.component.html',
  styleUrls: ['./linkadvance.component.scss']
})
export class LinkadvanceComponent implements OnInit {

  constructor() { }

  linkadvance;

  ngOnInit() {
    this.linkadvance={
      Id:0,
      BranchCode:"0",
      IpAdd:"0",
      CreatedBy:0,
      guestname:"0",
      roomno:"0" 
      }  
  }

}
