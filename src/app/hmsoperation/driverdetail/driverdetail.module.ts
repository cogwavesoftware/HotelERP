import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverdetailRoutingModule } from './driverdetail-routing.module';
import { DriverdetailComponent } from './driverdetail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DriverdetailComponent],
  imports: [
    CommonModule,
    DriverdetailRoutingModule,
    SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     ReactiveFormsModule
  ]
})
export class DriverdetailModule { }
