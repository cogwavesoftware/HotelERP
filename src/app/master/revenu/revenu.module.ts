
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { RevenuComponent } from './revenu.component';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { RevenuRoutingModule } from './revenu-routing.module';
import {ToastyModule} from 'ng2-toasty';
 
@NgModule({
  declarations: [RevenuComponent],
  imports: [
    CommonModule,RevenuRoutingModule,FormsModule,DataTableModule,SharedModule,
    

 ToastyModule.forRoot()
  ]
})
export class RevenuModule { }
