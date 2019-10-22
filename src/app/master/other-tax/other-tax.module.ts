
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherTaxRoutingModule } from './other-tax-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtherTaxComponent } from './other-tax.component';

import { FormsModule } from 'src/app/theme/forms/forms.module';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  declarations: [OtherTaxComponent],
  imports: [
    CommonModule,OtherTaxRoutingModule,SharedModule,DataTableModule,FormsModule
  ]
})
export class OtherTaxModule { }
