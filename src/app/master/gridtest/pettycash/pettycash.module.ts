import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PettycashRoutingModule } from './pettycash-routing.module';
import { PettycashComponent } from './pettycash.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [PettycashComponent],
  providers: [DatePipe ],
  imports: [
    CommonModule,SharedModule,ReactiveFormsModule,
    PettycashRoutingModule,FormsModule ,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ]
})
export class PettycashModule { }
