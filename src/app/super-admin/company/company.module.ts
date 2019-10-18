
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { CompanyComponent } from './company.component';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,CompanyRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe]
})
export class CompanyModule { }
