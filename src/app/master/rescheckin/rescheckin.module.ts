
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { RescheckinRoutingModule } from './rescheckin-routing.module';
import { RescheckinComponent } from './rescheckin.component';
import { SharedModule } from './../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [RescheckinComponent],
  providers: [DatePipe,ConfirmationDialogService],
  imports: [
    CommonModule,RescheckinRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
    ReactiveFormsModule,ToastyModule.forRoot()
    
    
  ]
})

export class RescheckinModule { }



