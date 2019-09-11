

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CommonpageRoutingModule } from './commonpage-routing.module';
import { CommonpageComponent } from './commonpage.component';


@NgModule({
 
  imports: [
    CommonModule,
    CommonpageRoutingModule,
    SharedModule
  ],
  declarations: [CommonpageComponent],
})
export class CommonpageModule { }
