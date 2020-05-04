import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetcomplimentRoutingModule } from './setcompliment-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { SetcomplimentComponent } from './setcompliment.component';


import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

  

@NgModule({
  declarations: [SetcomplimentComponent],
  providers: [DatePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    SetcomplimentRoutingModule,
    CommonModule, 
     SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule
  ]
})
export class SetcomplimentModule { }
