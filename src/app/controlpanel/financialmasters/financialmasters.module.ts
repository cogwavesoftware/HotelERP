
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialmastersComponent } from './financialmasters.component';

import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';
import { FinancialmastersRoutingModule } from './financialmasters-routing.module';

@NgModule({
  declarations: [FinancialmastersComponent],
  imports: [
    CommonModule,
    FinancialmastersRoutingModule,
      SharedModule,
    FormsModule,
    ReactiveFormsModule,   
    DataTableModule,
    HttpClientModule,ToastyModule.forRoot()
    
  ]
})
export class FinancialmastersModule { }
