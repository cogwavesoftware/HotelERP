
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
import { AdvancetransferRoutingModule } from './advancetransfer-routing.module';
import { AdvancetransferComponent } from './advancetransfer.component';

import {TagInputModule} from 'ngx-chips';
import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
 
 @NgModule({
  declarations: [AdvancetransferComponent ],
  //declarations: [ReservationComponent,ConfirmationDialogComponent],
  providers: [DatePipe,ConfirmationDialogService],
  imports: [
     CommonModule,AdvancetransferRoutingModule,
     SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     NgSelectModule,TagInputModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule,ToastyModule.forRoot()
  ],
 
})
export class AdvancetransferModule { }


