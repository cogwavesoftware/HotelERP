
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridtestRoutingModule } from './gridtest-routing.module';
import { FormsModule } from 'src/app/theme/forms/forms.module';
import { GridtestComponent } from './gridtest.component';

import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [GridtestComponent],
  imports: [
    CommonModule,GridtestRoutingModule,SharedModule,FormsModule
  ]
})
export class GridtestModule { }
