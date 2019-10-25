
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridtestRoutingModule } from './gridtest-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridtestComponent } from './gridtest.component';
import { SharedModule } from './../../shared/shared.module';
import { CompareValidatorDirective } from 'src/app/shared/compare-validator.directive';

@NgModule({
  declarations: [GridtestComponent],
  imports: [
    CommonModule,GridtestRoutingModule,SharedModule,FormsModule
  ],
  // exports:[CompareValidatorDirective]
})
export class GridtestModule { }
