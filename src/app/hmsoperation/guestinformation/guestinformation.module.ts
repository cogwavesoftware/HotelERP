import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestinformationRoutingModule } from './guestinformation-routing.module';
import { GuestinformationComponent } from './guestinformation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ng2-toasty';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [GuestinformationComponent],
  imports: [
    CommonModule,
    GuestinformationRoutingModule,
    SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     NgSelectModule ,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule,ToastyModule.forRoot(),
     AgGridModule.withComponents([])
  ]
})
export class GuestinformationModule { }
