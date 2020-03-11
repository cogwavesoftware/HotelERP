import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscountportalRoutingModule } from './discountportal-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DiscountportalComponent } from './discountportal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [DiscountportalComponent],
  imports: [
    CommonModule,
    DiscountportalRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule ,
    BsDatepickerModule.forRoot()
  ]
})
export class DiscountportalModule { }
