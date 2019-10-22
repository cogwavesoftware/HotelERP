
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherTaxRoutingModule } from './other-tax-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtherTaxComponent } from './other-tax.component';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {HttpClientModule} from '@angular/common/http';
 


@NgModule({
  declarations: [OtherTaxComponent],
  imports: [
    CommonModule,OtherTaxRoutingModule,SharedModule,DataTableModule,FormsModule,HttpClientModule,ReactiveFormsModule
  ]
})
export class OtherTaxModule { }
