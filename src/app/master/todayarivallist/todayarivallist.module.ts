
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import {DatePipe} from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import {DataTableModule} from 'angular2-datatable';
import { TodayarivallistRoutingModule } from './todayarivallist-routing.module';
import { TodayarivallistComponent } from './todayarivallist.component';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
//import {ChartModule} from 'angular2-chartjs';


@NgModule({
  declarations: [TodayarivallistComponent],
  imports: [
    CommonModule,TodayarivallistRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,ChartsModule,
    
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
 
})
export class TodayarivallistModule { }




