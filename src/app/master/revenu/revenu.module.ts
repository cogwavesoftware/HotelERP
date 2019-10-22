
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { RevenuComponent } from './revenu.component';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { RevenuRoutingModule } from './revenu-routing.module';

@NgModule({
  declarations: [RevenuComponent],
  imports: [
    CommonModule,RevenuRoutingModule,FormsModule,DataTableModule,SharedModule
  ]
})
export class RevenuModule { }
