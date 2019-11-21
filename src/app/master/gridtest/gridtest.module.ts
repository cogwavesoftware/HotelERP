
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridtestRoutingModule } from './gridtest-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridtestComponent } from './gridtest.component';
import { SharedModule } from './../../shared/shared.module';
import { CompareValidatorDirective } from 'src/app/shared/compare-validator.directive';
import {DatePipe} from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import {DataTableModule} from 'angular2-datatable';

import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [GridtestComponent],
  imports: [
    CommonModule,GridtestRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class GridtestModule { }
