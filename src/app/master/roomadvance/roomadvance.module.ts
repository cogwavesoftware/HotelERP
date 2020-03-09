import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RoomadvanceRoutingModule } from './roomadvance-routing.module';
import { RoomadvanceComponent } from './roomadvance.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [RoomadvanceComponent],
   providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    DataTableModule,
    RoomadvanceRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ]
})
export class RoomadvanceModule { }
