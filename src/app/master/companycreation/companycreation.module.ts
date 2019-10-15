
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CompanycreationRoutingModule } from './companycreation-routing.module';
import { CompanycreationComponent } from './companycreation.component';



@NgModule({
  declarations: [CompanycreationComponent],
  imports: [
    CommonModule,CompanycreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanycreationModule { }
