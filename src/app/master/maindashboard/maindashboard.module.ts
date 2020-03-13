import { BlockingdetailsComponent } from './blockingdetails/blockingdetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaindashboardComponent} from './maindashboard.component';
import {ChartModule} from 'angular2-chartjs';
 
import { ToastyModule } from 'ng2-toasty';
import { ProductstatusComponent } from './productstatus/productstatus.component';
import { ProductstatusRoutingModule } from './productstatus/productstatus-routing.module';
import { RoomgridComponent } from './roomgrid/roomgrid.component';
import { DashtabsComponent } from './dashtabs/dashtabs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
@NgModule({
  declarations: [MaindashboardComponent,BlockingdetailsComponent ] ,
  imports: [
    CommonModule,
    MaindashboardRoutingModule, ProductstatusRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule ,
    ChartModule,
    BsDatepickerModule.forRoot(),ToastyModule.forRoot()
  ],
 // entryComponents:[BlockingdetailsComponent]
})
export class MaindashboardModule { }
