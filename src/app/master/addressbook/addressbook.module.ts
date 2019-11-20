
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {  AddressbookComponent } from '../addressbook/addressbook.component';
import { ToastyModule } from 'ng2-toasty';
import { AddressbookRoutingModule } from './addressbook-routing.module';




@NgModule({
  declarations: [AddressbookComponent],
  imports: [
    CommonModule,AddressbookRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class AddressbookModule { }
