
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitpurposeRoutingModule } from './visitpurpose-routing.module';
import { VisitpurposeComponent } from './visitpurpose.component';
import { DataTableModule } from './../../theme/table/data-table/data-table.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [VisitpurposeComponent],
  imports: [
    CommonModule,SharedModule,FormsModule,VisitpurposeRoutingModule,DataTableModule
  ]
})
export class VisitpurposeModule { }
