
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';

import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [ReservationComponent,ConfirmationDialogComponent],
  providers: [DatePipe,ConfirmationDialogService],
  imports: [
    CommonModule,ReservationRoutingModule,
    SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
    NgSelectModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
   entryComponents:[ConfirmationDialogComponent]
})
export class ReservationModule { }
