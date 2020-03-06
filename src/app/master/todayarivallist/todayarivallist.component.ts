
import { RoomtypeService } from 'src/app/_services/roomtype.service';
import { ReservationService } from './../../_services/reservation.service';
import {DatePipe}  from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label,Color } from 'ng2-charts';

@Component({
  selector: 'app-todayarivallist',
  templateUrl: './todayarivallist.component.html',
  styleUrls: ['./todayarivallist.component.scss'
]
})
export class TodayarivallistComponent implements OnInit {
  Branch:string;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  Apidata:any[]=[];

  //public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: Label[] = [];

  //public barChartType: ChartType = 'bar';
  public barChartType: ChartType;
  public Show:boolean;
  //public barChartLegend = true;
  public barChartLegend:boolean;

  //public barChartPlugins = [pluginDataLabels];
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] =[];
  roomtypelist:any;



   roomtype= [];
   HeadeDate=[];
   minDate: Date;
   maxDate:Date;
   golbalresponse:any;
   Day:number=0;
   
   InitalDate:Date;
  

  constructor( private _Reservation:ReservationService,private _roomtypeservice:RoomtypeService,
    private datePipe: DatePipe) { 
    this.Branch="CW_1001";
  }
  public barChartColors: Color[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'orange' },
    { backgroundColor: 'blue' },
    { backgroundColor: '#ccc' },
    { backgroundColor: '#f2f2f3' }
  ]

  ngOnInit() {
  
  this._Reservation.AllRoomTypeChart(this.Branch).subscribe(res=>{  
    
    console.log('res')
    console.log(res)
    this.barChartLabels=res['Date'];
    this.barChartType='bar'
    this.barChartLegend=true;
    this.barChartPlugins=[pluginDataLabels]
    console.log(res)
    this.Apidata=res['data'];
    this.barChartData= this.Apidata;
    console.log('this.barChartData')
    console.log(this.barChartData)
    
    this.Show=true;

    
  })

  this._roomtypeservice.GetRoomType(this.Branch).subscribe((data: any) => {
    this.roomtypelist = data;
    console.log('data')
    console.log(data)
  });

 

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('chartClicked');
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('chartHovered');
  }

  public randomize(name:string): void {

   if(name=="0")
   {
    this._Reservation.AllRoomTypeChart(this.Branch).subscribe(res=>{  
      this.barChartLabels=res['Date'];
      this.barChartType='bar'
      this.barChartLegend=true;
      this.barChartPlugins=[pluginDataLabels]
      
      this.Apidata=res['data'];
      this.barChartData= this.Apidata;
      console.log('this.barChartData')
      console.log(this.barChartData)  
      this.Show=true;  
    })
   }
   
   else
   {
    let CurrentDate=this.datePipe.transform( new Date(Date.now()),"MM/dd/yyyy");
    this._Reservation.Chartlist(this.Branch,name,CurrentDate).subscribe(res=>{   
      this.barChartLabels=res['Date'];
      this.barChartType='bar'
      this.barChartLegend=true;
      this.barChartPlugins=[pluginDataLabels]
      console.log(res)
      this.Apidata=res['data'];
      this.barChartData= this.Apidata;
      console.log(this.barChartData)
      this.Show=true;
    })
   }
   
  
  }

  
}








function GFG_Fun() { 
  var date = new Date(); 
  var month = date.getMonth() + 1; 
  alert(month)
 
  var year = date.getFullYear(); 
  alert(year)

  var day = date.getUTCDay(); 
  alert(day)

  // down.innerHTML = "Number of days in " + month 
  //             + "th month of the year " + year  
  //             +" is "+ daysInMonth(month, year); 
}