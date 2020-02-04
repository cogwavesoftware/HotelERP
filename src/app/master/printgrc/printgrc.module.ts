import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';

import { PrintgrcRoutingModule } from './printgrc-routing.module';
import {PrintgrcComponent} from './printgrc.component';

@NgModule({
  declarations: [PrintgrcComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrintgrcRoutingModule
  ]
})
export class PrintgrcModule { }
