
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorcreationRoutingModule } from './floorcreation-routing.module';
import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FloorcreationComponent } from './floorcreation.component';



@NgModule({
  declarations: [FloorcreationComponent],
  imports: [
    CommonModule,FloorcreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FloorcreationModule { }

