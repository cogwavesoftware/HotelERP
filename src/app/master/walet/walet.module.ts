
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WaletRoutingModule } from './walet-routing.module';
import { WaletComponent } from './walet.component';
import {HttpClientModule} from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';

@NgModule({
  declarations: [WaletComponent],
  imports: [CommonModule,WaletRoutingModule,SharedModule,FormsModule,DataTableModule,
  ToastyModule.forRoot()]
})
export class WaletModule { }
