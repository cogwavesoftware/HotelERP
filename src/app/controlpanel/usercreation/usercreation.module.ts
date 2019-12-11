
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercreationRoutingModule } from './usercreation-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { CompareValidatorDirective } from 'src/app/shared/compare-validator.directive';
import {DatePipe} from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import {DataTableModule} from 'angular2-datatable';

import {HttpClientModule} from '@angular/common/http';
import { UsercreationComponent } from './usercreation.component';
@NgModule({
  declarations: [UsercreationComponent],
  imports: [
    CommonModule,UsercreationRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class UsercreationModule { }
