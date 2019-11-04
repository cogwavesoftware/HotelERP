import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FinancialmasterRoutingModule  }  from './financialmaster-routing.module';
import {FinancialmasterComponent }  from './financialmaster.component';



@NgModule({
  declarations: [FinancialmasterComponent],
  imports: [
    CommonModule,
    FinancialmasterRoutingModule,
      SharedModule,
    FormsModule,
    ReactiveFormsModule,   
    DataTableModule,
    HttpClientModule
    
  ]
})
export class FinancialmasterModule { }
