
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-gridtest',
  templateUrl: './gridtest.component.html',
  styleUrls: ['./gridtest.component.scss']
})
export class GridtestComponent implements OnInit {

  model:any={}
  constructor() { }

  ngOnInit() {
  }

}
