
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RoomtypecreationRoutingModule } from './roomtypecreation-routing.module';
import { RoomtypecreationComponent } from './roomtypecreation.component';

@NgModule({
  declarations: [RoomtypecreationComponent],
  imports: [
    CommonModule,RoomtypecreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe]
})
export class RoomtypecreationModule { }

