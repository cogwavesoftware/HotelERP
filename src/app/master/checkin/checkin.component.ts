import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  public navRight: string;
  constructor() { 
    this.navRight = 'nav-off';
  }

  ngOnInit() {
  }
  
}
