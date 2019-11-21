import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddressbookRoutingModule  }  from './addressbook-routing.module';
import {AddressbookComponent }  from './addressbook.component';

 
@NgModule({
  declarations: [AddressbookComponent],
  imports: [
    CommonModule,
    AddressbookRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,   
    DataTableModule,
    HttpClientModule
  ]
})
export class AddressbookModule { }
