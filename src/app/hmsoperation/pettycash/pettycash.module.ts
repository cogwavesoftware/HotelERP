
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PettycashComponent } from './pettycash.component';
import { PettycashRoutingModule } from './pettycash-routing.module';
 @NgModule({
  declarations: [PettycashComponent],
  providers: [DatePipe],
  imports: [
     CommonModule,PettycashRoutingModule,
     SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule,ToastyModule.forRoot()
  ]
 
})
export class PettycashModule { }

