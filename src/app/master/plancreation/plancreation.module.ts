

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { PlancreationRoutingModule } from './plancreation-routing.module';
import { PlancreationComponent } from './plancreation.component';

import {ToastyModule} from 'ng2-toasty';
 


@NgModule({
  declarations: [PlancreationComponent],
  imports: [
    CommonModule,PlancreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ]
})
export class PlancreationModule { }

