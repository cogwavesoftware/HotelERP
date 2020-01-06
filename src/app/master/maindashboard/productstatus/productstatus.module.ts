import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { ProductstatusRoutingModule } from './productstatus-routing.module';
import {ProductstatusComponent} from '../productstatus/productstatus.component';


@NgModule({
  declarations: [ProductstatusComponent], 
  imports: [
    CommonModule,
    ProductstatusRoutingModule,
     SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule  
     
  ]
})
export class ProductstatusModule { }
