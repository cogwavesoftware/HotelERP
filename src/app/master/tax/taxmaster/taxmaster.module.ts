
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TaxmasterRoutingModule } from './taxmaster-routing.module';
import { TaxmasterComponent } from './taxmaster.component';



@NgModule({
  declarations: [TaxmasterComponent],
  imports: [
    CommonModule,TaxmasterRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaxmasterModule { }
