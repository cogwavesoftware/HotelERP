
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialRoutingModule } from './financial-routing.module';
import { FinancialComponent } from './financial.component';

import { FormsModule } from '@angular/forms';
import { DataTableModule } from './../../theme/table/data-table/data-table.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FinancialComponent],
  imports: [
    CommonModule,FinancialRoutingModule,SharedModule,DataTableModule,FormsModule
  ]
})
export class FinancialModule { }
