
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RoomorganizerRoutingModule } from './roomorganizer-routing.module';
import { RoomorganizerComponent } from './roomorganizer.component';


@NgModule({
  declarations: [RoomorganizerComponent],
  imports: [
    CommonModule,RoomorganizerRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomorganizerModule { }
