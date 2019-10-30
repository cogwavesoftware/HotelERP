import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxRoutingModule } from './tax-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,TaxRoutingModule,SharedModule
  ]
})
export class TaxModule { }
