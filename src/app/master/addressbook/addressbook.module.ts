
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {  AddressbookComponent } from '../addressbook/addressbook.component';
 
import { AddressbookRoutingModule } from './addressbook-routing.module';

import {ToastyModule} from 'ng2-toasty';


 
 
@NgModule({
  declarations: [AddressbookComponent],
  imports: [
    CommonModule,
    AddressbookRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,   
    DataTableModule,
    HttpClientModule,ToastyModule.forRoot()
  ]
})
export class AddressbookModule { }
