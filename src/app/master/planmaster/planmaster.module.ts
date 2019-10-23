

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { PlanmasterRoutingModule } from './planmaster-routing.module';
import { PlanmasterComponent } from './planmaster.component';


@NgModule({
  declarations: [PlanmasterComponent],
  imports: [
    CommonModule,PlanmasterRoutingModule,SharedModule,FormsModule,DataTableModule
  ]
})
export class PlanmasterModule { }
