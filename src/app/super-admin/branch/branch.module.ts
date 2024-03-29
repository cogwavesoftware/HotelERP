
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchRoutingModule } from './branch-routing.module';
import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BranchComponent } from './branch.component';
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule,BranchRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe]
})
export class BranchModule { }
