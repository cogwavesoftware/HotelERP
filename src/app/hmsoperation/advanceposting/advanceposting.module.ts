
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AdvancepostingComponent } from './advanceposting.component';
import { AdvancepostingRoutingModule } from './advanceposting-routing.module';
import { HttpClientModule } from '@angular/common/http';  
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToastyModule } from 'ng2-toasty';
@NgModule({
  declarations: [AdvancepostingComponent],  
  providers: [DatePipe],
  imports: [
    CommonModule,SharedModule,
    AdvancepostingRoutingModule,
 
    HttpClientModule,    
     HttpClientModule,
     DataTableModule,
     FormsModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class AdvancepostingModule { }
