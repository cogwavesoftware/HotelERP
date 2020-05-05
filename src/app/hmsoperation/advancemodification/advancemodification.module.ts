import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AdvancemodificationComponent} from './advancemodification.component';
import { AdvancemodificationRoutingModule } from './advancemodification-routing.module'; 


 import { HttpClientModule } from '@angular/common/http';  

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdvancemodificationComponent],  
  providers: [DatePipe],
  imports: [
    CommonModule,SharedModule,
    AdvancemodificationRoutingModule,
 
    HttpClientModule,    
     HttpClientModule,
     DataTableModule,
     FormsModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
     ReactiveFormsModule
  ]
})
export class AdvancemodificationModule { }
