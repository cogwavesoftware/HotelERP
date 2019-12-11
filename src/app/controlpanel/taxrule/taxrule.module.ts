

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaxruleRoutingModule } from './taxrule-routing.module';
import { TaxruleComponent } from './taxrule.component';

import {ToastyModule} from 'ng2-toasty';
import { AgGridModule } from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [TaxruleComponent],
  imports: [
    CommonModule,TaxruleRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule, 
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    AgGridModule.withComponents([])
  ]
})
export class TaxruleModule { }
