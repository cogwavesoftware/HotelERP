import { GuestcreationComponent } from './guestcreation.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GuestcreationRoutingModule } from './guestcreation-routing.module';
import {DatePipe} from '@angular/common';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [GuestcreationComponent],
  imports: [
    CommonModule,GuestcreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    ReactiveFormsModule,
    FormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class GuestcreationModule { }

