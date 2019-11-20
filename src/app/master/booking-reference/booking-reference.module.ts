

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { BookingReferenceRoutingModule  } from "./booking-reference-routing.module";
import { BookingReferenceComponent } from './booking-reference.component';

import {ToastyModule} from 'ng2-toasty';


@NgModule({
  declarations: [BookingReferenceComponent],
  imports: [
    CommonModule,BookingReferenceRoutingModule,SharedModule,FormsModule,DataTableModule,
    
 ToastyModule.forRoot()
  ]
})
export class BookingReferenceModule {  }
