
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { CompareValidatorDirective } from 'src/app/shared/compare-validator.directive';
import {DatePipe} from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import {DataTableModule} from 'angular2-datatable';
import { TodayarivallistRoutingModule } from './todayarivallist-routing.module';
import { TodayarivallistComponent } from './todayarivallist.component';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [TodayarivallistComponent],
  imports: [
    CommonModule,TodayarivallistRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class TodayarivallistModule { }




