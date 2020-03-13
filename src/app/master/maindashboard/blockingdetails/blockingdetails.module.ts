import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockingdetailsRoutingModule } from './blockingdetails-routing.module';
//import { BlockingdetailsComponent } from './blockingdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import {DatePipe} from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
 
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [],
//  providers: [DatePipe],
  imports: [
    CommonModule,BlockingdetailsRoutingModule,
    BlockingdetailsRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    //MatDialogModule,
    //BsDatepickerModule.forRoot()
  ]
})
export class BlockingdetailsModule { }
