
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RoomtypecreationRoutingModule } from './roomtypecreation-routing.module';
import { RoomtypecreationComponent } from './roomtypecreation.component';

import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [RoomtypecreationComponent],
  imports: [
    CommonModule,RoomtypecreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class RoomtypecreationModule { }

