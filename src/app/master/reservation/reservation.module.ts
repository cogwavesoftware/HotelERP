import { LoadingComponent } from './../loading/loading.component';

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
import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import {TagInputModule} from 'ngx-chips';
import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
 
 @NgModule({
  declarations: [ReservationComponent ,LoadingComponent],
  //declarations: [ReservationComponent,ConfirmationDialogComponent],
  providers: [DatePipe,ConfirmationDialogService],
  imports: [
     CommonModule,ReservationRoutingModule,
     SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     NgSelectModule,TagInputModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule,ToastyModule.forRoot()
  ],
  entryComponents:[LoadingComponent]
})
export class ReservationModule { }

