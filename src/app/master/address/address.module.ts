
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AddressComponent }  from '../address/address.component';
import { AddressRoutingModule  }  from './address-routing.module';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,AddressRoutingModule,SharedModule,DataTableModule,FormsModule,
    ReactiveFormsModule,HttpClientModule,
    ToastyModule.forRoot(),
  ],
  
})
export class AddressModule { }
