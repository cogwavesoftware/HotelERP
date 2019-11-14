
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgercreationComponent } from './ledgercreation.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from './../../shared/shared.module';
import { LedgercreationRoutingModule } from './ledgercreation-routing.module';
import {ToastyModule} from 'ng2-toasty';


@NgModule({
  declarations: [LedgercreationComponent],
  imports: [
    CommonModule,LedgercreationRoutingModule,SharedModule,DataTableModule,FormsModule,
    ToastyModule.forRoot()
 
  
  ]
})
export class LedgercreationModule { }
