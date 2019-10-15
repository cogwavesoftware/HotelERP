import { GuestcreationComponent } from './guestcreation.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GuestcreationRoutingModule } from './guestcreation-routing.module';



@NgModule({
  declarations: [GuestcreationComponent],
  imports: [
    CommonModule,GuestcreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GuestcreationModule { }

