
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTableModule } from './../../theme/table/data-table/data-table.module';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WaletRoutingModule } from './walet-routing.module';
import { WaletComponent } from './walet.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [WaletComponent],
  imports: [CommonModule,WaletRoutingModule,SharedModule,FormsModule,DataTableModule]
})
export class WaletModule { }
