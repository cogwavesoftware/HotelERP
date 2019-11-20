
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
 
import { CompanycreationRoutingModule } from './companycreation-routing.module';
import { CompanycreationComponent } from './companycreation.component';
import { AgGridModule } from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';


import {ToastyModule} from 'ng2-toasty';
 

@NgModule({
  declarations: [CompanycreationComponent],
  imports: [
    CommonModule,CompanycreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    AgGridModule.withComponents([])
  ]
})
export class CompanycreationModule { }
