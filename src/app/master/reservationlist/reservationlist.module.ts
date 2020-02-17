
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CompareValidatorDirective } from 'src/app/shared/compare-validator.directive';
import {DatePipe} from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import {DataTableModule} from 'angular2-datatable';
import { ReservationlistRoutingModule } from './reservationlist-routing.module';

import {HttpClientModule} from '@angular/common/http';
import { ReservationlistComponent } from './reservationlist.component';

@NgModule({
  declarations: [ReservationlistComponent],
  imports: [
    CommonModule,ReservationlistRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class ReservationlistModule { }




