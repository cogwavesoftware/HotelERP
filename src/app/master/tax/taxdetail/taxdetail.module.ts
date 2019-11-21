import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaxdetailRoutingModule } from './taxdetail-routing.module';
import { TaxdetailComponent } from './taxdetail.component';
import {DatePipe} from '@angular/common';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  declarations: [TaxdetailComponent],
  imports: [
    CommonModule,SharedModule,TaxdetailRoutingModule,DataTableModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    ToastyModule.forRoot()
    

  ],
  providers:[DatePipe]
})
export class TaxdetailModule { }
