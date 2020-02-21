import { Component, OnInit } from '@angular/core';  
 import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http'; 

import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { animate, style, transition, trigger } from "@angular/animations";

import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AddressService } from './../../_services/address.service';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";

export class Data {  
  PlayerName :string;  
  Run:string;  
}  

@Component({
  selector: 'app-rescheckin',
  templateUrl: './rescheckin.component.html',
  styleUrls: ['./rescheckin.component.scss']
})

export class RescheckinComponent implements OnInit {  
  
  url = 'http://localhost:58617/API/Charts/GetCharts';  
  data: Data[];  
  Player = [];  
  Run = [];  
  Linechart = [];  
  constructor(private httpClient: HttpClient) { }  
  
  ngOnInit() {  

  
      
  }  
}  