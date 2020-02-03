import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaindashboardComponent} from './maindashboard.component';
import {ChartModule} from 'angular2-chartjs';
 
  import { ProductstatusComponent } from './productstatus/productstatus.component';
import { ProductstatusRoutingModule } from './productstatus/productstatus-routing.module';
import { RoomgridComponent } from './roomgrid/roomgrid.component';
import { DashtabsComponent } from './dashtabs/dashtabs.component';
 
@NgModule({
  declarations: [MaindashboardComponent, ProductstatusComponent, RoomgridComponent, DashtabsComponent] ,
  imports: [
    CommonModule,
    MaindashboardRoutingModule, ProductstatusRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule ,
    ChartModule
  ]
})
export class MaindashboardModule { }
