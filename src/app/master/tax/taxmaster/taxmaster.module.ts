
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TaxmasterRoutingModule } from './taxmaster-routing.module';
import { TaxmasterComponent } from './taxmaster.component'; 
import {DatePipe} from '@angular/common';

import {ToastyModule} from 'ng2-toasty';
@NgModule({
  declarations: [TaxmasterComponent],
  imports: [
    CommonModule,TaxmasterRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,

    ToastyModule.forRoot()
  ],
  providers:[DatePipe]
})
export class TaxmasterModule { }
