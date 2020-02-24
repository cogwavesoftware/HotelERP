import { RoomtypeService } from 'src/app/_services/roomtype.service';
import { ReservationService } from './../../_services/reservation.service';

import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

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
  constructor( private _Res:ReservationService,private _roomtypeservice:RoomtypeService) { 
    this.Branch="CW_1001";
  }
  ngOnInit() {
  
  this._Res.Chart().subscribe(res=>{   
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

  this._roomtypeservice.GetRoomType(this.Branch).subscribe((data: any) => {
    this.roomtypelist = data;
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
    this._Res.Chartlist(this.Branch,name,'02/21/2020').subscribe(res=>{   
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








