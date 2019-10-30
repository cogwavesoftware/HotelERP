import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaxdetailRoutingModule } from './taxdetail-routing.module';
import { TaxdetailComponent } from './taxdetail.component';



@NgModule({
  declarations: [TaxdetailComponent],
  imports: [
    CommonModule,SharedModule,TaxdetailRoutingModule
  ]
})
export class TaxdetailModule { }
