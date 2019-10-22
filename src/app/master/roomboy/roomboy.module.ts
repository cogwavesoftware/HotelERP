
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomboyComponent } from './roomboy.component';

import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RoomboyRoutingModule } from './roomboy-routing.module';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  declarations: [RoomboyComponent],
  imports: [
    CommonModule,RoomboyRoutingModule,SharedModule,FormsModule,DataTableModule
  ]
})
export class RoomboyModule { }
